# Website Hosting Architecture

## Overview

The Columns and Pillars website is a static HTML/CSS/JavaScript site hosted on AWS using S3, CloudFront, and Route 53. All infrastructure is in the Columns and Pillars AWS account (318117467323) under the company AWS Organization.

## Deployment command

```
aws s3 sync . s3://columnsnpillars.co.uk --exclude ".git/*" --exclude ".kiro/*" --exclude "*.mov" --exclude "*.mp4" --exclude "*.jpeg" --exclude ".DS_Store" --exclude "preview.html" --exclude "css/style-grey-preview.css" --profile columnspillars
```

## Cache invalidation command

```
aws cloudfront create-invalidation --distribution-id EN3RO0XBB8MIP --paths "/*" --profile columnspillars
```

## AWS services

- S3 bucket: columnsnpillars.co.uk (eu-west-2, private)
- CloudFront: EN3RO0XBB8MIP (du8ehuusozqcs.cloudfront.net)
- Origin Access Control: E2GFIAKN0I7LMD (sigv4)
- ACM certificate: 9dcc2328-e8ff-46de-a8ac-57096201a389 (us-east-1)
- Route 53 hosted zone: Z03745641C4T293HWPG3K
- CLI profile: columnspillars (eu-west-2)

## Domain

- columnsnpillars.co.uk registered in account 011887301447
- Nameservers delegated to Route 53 hosted zone in account 318117467323
