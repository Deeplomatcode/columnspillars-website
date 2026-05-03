#!/bin/bash

aws s3 sync . s3://columnsnpillars.co.uk \
  --exclude ".git/*" \
  --exclude ".kiro/*" \
  --exclude ".vscode/*" \
  --exclude ".gitignore" \
  --exclude ".DS_Store" \
  --exclude "images/.DS_Store" \
  --exclude "README.md" \
  --exclude "preview.html" \
  --exclude "css/style-grey-preview.css" \
  --exclude "*.mov" \
  --exclude "*.mp4" \
  --exclude "*.jpeg" \
  --exclude "*.svg" \
  --exclude "deploy.sh" \
  --exclude "*.zip" \
  --profile columnspillars \
  --delete

aws cloudfront create-invalidation \
  --distribution-id EN3RO0XBB8MIP \
  --paths "/*" \
  --profile columnspillars
