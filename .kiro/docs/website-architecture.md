# Website Hosting Architecture

## Overview

The Columns and Pillars website is a static HTML/CSS/JavaScript site hosted on AWS using S3, CloudFront, Route 53, and a serverless contact form backend. All infrastructure is in the Columns and Pillars AWS account (318117467323) under the company AWS Organization.

## Architecture chain

Local dev (Kiro + VS Code) → GitHub (main branch) → deploy.sh → S3 bucket → CloudFront CDN → Route 53 DNS → https://columnsnpillars.co.uk

## Deploy command

```
cd ~/Desktop/columnspillars-website && ./deploy.sh
```

## AWS services

### Static hosting

- S3 bucket: columnsnpillars.co.uk (eu-west-2, private, no public access)
- CloudFront: EN3RO0XBB8MIP (du8ehuusozqcs.cloudfront.net, HTTPS, redirect-to-https, PriceClass_100)
- Origin Access Control: E2GFIAKN0I7LMD (sigv4)
- ACM certificate: 9dcc2328-e8ff-46de-a8ac-57096201a389 (us-east-1, TLS 1.2)

### DNS (Route 53)

- Hosted zone: Z03745641C4T293HWPG3K
- A record (alias): columnsnpillars.co.uk → CloudFront
- A record (alias): www.columnsnpillars.co.uk → CloudFront
- MX: 10 inbound-smtp.eu-west-1.amazonaws.com (AWS WorkMail)
- TXT: SPF (v=spf1 include:amazonses.com ~all)
- TXT: Google site verification
- TXT: SES domain verification (_amazonses.columnsnpillars.co.uk)
- TXT: DMARC policy (_dmarc.columnsnpillars.co.uk)
- CNAME x6: DKIM signing keys
- CNAME: autodiscover for WorkMail
- CNAME: ACM certificate validation

### Contact form backend

- API Gateway: xq67wneoj3 (https://xq67wneoj3.execute-api.eu-west-2.amazonaws.com/submit)
- Lambda: contact-form (Node.js 20, 128MB, 10s timeout)
- IAM role: contact-form-lambda-role
- SES: verified sender hello@columnsnpillars.co.uk (eu-west-2)
- Form submits POST with JSON: firstName, lastName, email, organisation, interest, message, timeline

## Domain

- columnsnpillars.co.uk registered in account 011887301447
- Nameservers pointed to Columns and Pillars account: ns-1989.awsdns-56.co.uk, ns-698.awsdns-23.net, ns-440.awsdns-55.com, ns-1404.awsdns-47.org

## CLI profile

- Profile name: columnspillars
- Region: eu-west-2
- User: columnsnpillars-admin

## Integrations

- Google Search Console: verified via DNS TXT record, sitemap submitted
- AWS WorkMail: email at hello@columnsnpillars.co.uk via eu-west-1

## Cost

- Route 53 hosted zone: $0.50/month
- All other services: Free Tier eligible
- Total: $0.50/month
