# 🖼️ Upload Product Image API (Node.js + MySQL + MinIO)

A simple REST API for uploading product images. Images are stored in **MinIO** (an S3-compatible storage system) and metadata is saved in **MySQL**. Ideal for product catalogs, CMS, or image handling microservices.

---

## 🎞️ Tech Stack

* ⚙️ Node.js + Express
* 🐬 MySQL 5.7
* ☁️ MinIO (S3-compatible storage)
* 🐳 Docker + Docker Compose

---

## ✨ Getting Started

### 1. 📜 Clone the Repository

```bash
git clone https://github.com/your-username/upload-product-image-api.git
cd upload-product-image-api
```

### 2. 🐳 Start All Containers

```bash
docker-compose up --build
```

This will spin up:

| Service       | Port   | Notes                    |
| ------------- | ------ | ------------------------ |
| API Server    | `3000` | Node.js Express backend  |
| MySQL         | `3306` | Stores image metadata    |
| phpMyAdmin    | `8080` | GUI for MySQL (optional) |
| MinIO (API)   | `9000` | S3-compatible API        |
| MinIO Console | `9001` | Admin web UI             |

### 🔐 Credentials

* **phpMyAdmin**

  * URL: [http://localhost:8080](http://localhost:8080)
  * Username: `root`
  * Password: `password`

* **MinIO Console**

  * URL: [http://localhost:9001](http://localhost:9001)
  * Username: `minioadmin`
  * Password: `minioadmin`

---

## 🧰 Database Schema

MySQL will automatically create the following schema on startup:

```sql
CREATE TABLE product_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🌐 API Usage

### ✅ Upload Endpoint

```bash
POST http://localhost:3000/upload-product-image
```

### 📄 Sending a Request (Postman Instructions)

1. Open **Postman**.
2. Set method to **POST** and enter the URL:
   `http://localhost:3000/upload-product-image`
3. Go to the **Body** tab → **form-data**.
4. Add a key:

   * **Key**: `image`
   * **Type**: `File`
   * **Value**: Choose an image file from your system.
5. Hit **Send**.

### ✅ Example Successful Response:

```json
{
  "imageUrl": "http://minio:9000/product-images/18d14437-0079-44ac-b816-96d11cd4d995_aws-color.svg"
}
```

---

## 🖼️ View Image in Browser

By default, the returned URL includes the hostname `minio`, which is internal to Docker.
To make it accessible in your local browser:

### ✅ Add Entry to `/etc/hosts`

**For Windows:**

1. Open Notepad as Administrator.
2. Navigate to:
   `C:\Windows\System32\drivers\etc\hosts`
3. Add this line at the end of the file:

```
127.0.0.1 minio
```

4. Save and close.
5. Now open the image URL (e.g., `http://minio:9000/product-images/your_image.jpg`) in your browser — ✅ it should display properly!

---
