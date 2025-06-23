FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Install bash using apk on Alpine
RUN apk update && apk add bash

COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

EXPOSE 3000

# Wait for MySQL before starting app
CMD ["bash", "/wait-for-it.sh", "mysql:3306", "--", "node", "app.js"]
