const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

describe('Image Upload API', () => {
  test('should upload an image and return a valid MinIO URL', async () => {
    const apiUrl = 'http://localhost:3000/upload-product-image';
    const imagePath = path.join(__dirname, 'aws-color.png');

    const imageStream = fs.createReadStream(imagePath);
    const formData = new FormData();
    formData.append('productImage', imageStream); // must match multer

    const response = await axios.post(apiUrl, formData, {
      headers: formData.getHeaders(),
      maxBodyLength: Infinity, // optional but good for large files
    });

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('imageUrl');
    expect(typeof response.data.imageUrl).toBe('string');
  });
});
