#!/bin/bash
set -e

echo "==> Building frontend..."
cd frontend
npm install --include=dev
npm run build
cd ..

echo "==> Copying frontend build to backend/public..."
mkdir -p backend/public
cp -r frontend/dist/. backend/public/

echo "==> Installing backend dependencies..."
cd backend
npm install

echo "==> Build complete."
