const express = require('express');
require('dotenv').config();
const uploadRoute = require('./routes/upload');

const app = express();
app.use(express.json());
app.use('/upload-product-image', uploadRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
