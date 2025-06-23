#!/bin/sh

# Wait for MinIO to be up
sleep 10

mc alias set myminio http://minio:9000 minioadmin minioadmin

mc mb --ignore-existing myminio/product-images

mc anonymous set download myminio/product-images
