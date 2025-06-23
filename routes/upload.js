const express = require('express');
const multer = require('multer');
const { uploadToS3 } = require('../services/s3');
const db = require('../config/db');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const { originalname, buffer } = req.file;
    const s3Result = await uploadToS3(originalname, buffer);
    const url = s3Result.Location;

    await db.promise().query(
      'INSERT INTO product_images (filename, url) VALUES (?, ?)',
      [originalname, url]
    );

    res.status(200).json({ message: 'Upload successful', url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;
