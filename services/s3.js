const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  endpoint: process.env.S3_ENDPOINT,
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
});

const uploadToS3 = (filename, buffer) => {
  const key = `${uuidv4()}_${filename}`;
  return s3.upload({
    Bucket: process.env.AWS_BUCKET,
    Key: key,
    Body: buffer,
    ACL: 'public-read',
    ContentType: 'image/jpeg',
  }).promise();
};

module.exports = { uploadToS3 };
