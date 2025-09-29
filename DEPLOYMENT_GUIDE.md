# 🚀 4Rent Deployment Guide

## Overview
This guide will help you deploy your 4Rent application using:
- **Frontend**: Vercel (Next.js)
- **Backend**: Render (Node.js + MongoDB)

## Prerequisites
1. GitHub account
2. Vercel account
3. Render account
4. MongoDB Atlas account
5. PayHere.lk account
6. SendGrid account

## Step 1: Prepare Your Repository

### 1.1 Push to GitHub
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 1.2 Environment Variables
Create a `.env.local` file with these variables:

```env
# NextAuth Configuration
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-super-secret-key-here

# Database
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/4rent?retryWrites=true&w=majority

# OAuth Providers
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# PayHere Payment Gateway
PAYHERE_MERCHANT_ID=your-payhere-merchant-id
PAYHERE_MERCHANT_SECRET=your-payhere-merchant-secret
PAYHERE_BASE_URL=https://sandbox.payhere.lk/pay/checkout

# SendGrid Email Service
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@4rent.lk

# Cron Job Security
CRON_SECRET=your-cron-secret-key
```

## Step 2: Deploy Frontend to Vercel

### 2.1 Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Select the root directory

### 2.2 Configure Vercel
1. **Framework Preset**: Next.js
2. **Root Directory**: `./` (root)
3. **Build Command**: `npm run build`
4. **Output Directory**: `.next` (auto-detected)

### 2.3 Set Environment Variables in Vercel
In Vercel dashboard → Project Settings → Environment Variables:

```
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-super-secret-key-here
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/4rent?retryWrites=true&w=majority
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
PAYHERE_MERCHANT_ID=your-payhere-merchant-id
PAYHERE_MERCHANT_SECRET=your-payhere-merchant-secret
PAYHERE_BASE_URL=https://sandbox.payhere.lk/pay/checkout
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@4rent.lk
CRON_SECRET=your-cron-secret-key
```

### 2.4 Deploy
1. Click "Deploy"
2. Wait for deployment to complete
3. Note your Vercel URL (e.g., `https://your-app.vercel.app`)

## Step 3: Deploy Backend to Render

### 3.1 Connect to Render
1. Go to [render.com](https://render.com)
2. Sign in with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository

### 3.2 Configure Render
1. **Name**: `4rent-backend`
2. **Environment**: `Node`
3. **Region**: Choose closest to your users
4. **Branch**: `main`
5. **Root Directory**: `./` (root)
6. **Build Command**: `npm install && npx prisma generate && npm run build`
7. **Start Command**: `npm start`

### 3.3 Set Environment Variables in Render
In Render dashboard → Environment:

```
NODE_ENV=production
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-super-secret-key-here
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/4rent?retryWrites=true&w=majority
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
PAYHERE_MERCHANT_ID=your-payhere-merchant-id
PAYHERE_MERCHANT_SECRET=your-payhere-merchant-secret
PAYHERE_BASE_URL=https://sandbox.payhere.lk/pay/checkout
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@4rent.lk
CRON_SECRET=your-cron-secret-key
```

### 3.4 Deploy
1. Click "Create Web Service"
2. Wait for deployment to complete
3. Note your Render URL (e.g., `https://4rent-backend.onrender.com`)

## Step 4: Update URLs

### 4.1 Update Vercel Environment Variables
After getting your Render URL, update Vercel:
1. Go to Vercel → Project Settings → Environment Variables
2. Update `NEXTAUTH_URL` to your Vercel URL
3. Redeploy if needed

### 4.2 Update PayHere Webhook URLs
1. Go to PayHere dashboard
2. Update webhook URLs to:
   - Success: `https://your-app.vercel.app/business/payment/success`
   - Cancel: `https://your-app.vercel.app/business/payment/cancel`
   - Notify: `https://your-app.vercel.app/api/business/payhere-webhook`

## Step 5: Set Up Cron Jobs

### 5.1 Using Render Cron Jobs
1. In Render dashboard, go to "Cron Jobs"
2. Create new cron job:
   - **Name**: `4rent-email-reminders`
   - **Schedule**: `0 9 * * *` (daily at 9 AM)
   - **URL**: `https://your-app.vercel.app/api/cron/email-reminders`
   - **Secret**: Your `CRON_SECRET` value

### 5.2 Alternative: External Cron Service
Use services like:
- [cron-job.org](https://cron-job.org)
- [EasyCron](https://www.easycron.com)
- [Cronitor](https://cronitor.io)

## Step 6: Test Your Deployment

### 6.1 Test Frontend
1. Visit your Vercel URL
2. Test user registration/login
3. Test listing creation
4. Test business registration

### 6.2 Test Backend APIs
1. Test API endpoints
2. Test PayHere integration
3. Test email notifications

### 6.3 Test Business Features
1. Register a business
2. Test subscription flow
3. Test refund requests

## Step 7: Production Checklist

### 7.1 Security
- [ ] All environment variables are set
- [ ] PayHere webhook validation is working
- [ ] Admin access is properly configured
- [ ] Database is secured

### 7.2 Performance
- [ ] Images are optimized
- [ ] Database queries are efficient
- [ ] Caching is configured
- [ ] CDN is enabled (Vercel handles this)

### 7.3 Monitoring
- [ ] Error tracking is set up
- [ ] Analytics are configured
- [ ] Uptime monitoring is active
- [ ] Logs are being collected

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check environment variables
   - Verify Node.js version compatibility
   - Check for missing dependencies

2. **Database Connection Issues**
   - Verify MongoDB Atlas connection string
   - Check IP whitelist settings
   - Ensure database user has proper permissions

3. **Authentication Issues**
   - Verify OAuth provider settings
   - Check callback URLs
   - Ensure NEXTAUTH_SECRET is set

4. **Payment Issues**
   - Verify PayHere credentials
   - Check webhook URLs
   - Test with sandbox mode first

### Support
- Vercel Documentation: https://vercel.com/docs
- Render Documentation: https://render.com/docs
- Next.js Documentation: https://nextjs.org/docs

## Next Steps

1. **Domain Setup**: Configure custom domain in Vercel
2. **SSL Certificates**: Automatically handled by Vercel
3. **Monitoring**: Set up error tracking and analytics
4. **Backup**: Configure database backups
5. **Scaling**: Monitor performance and scale as needed

---

**Congratulations! Your 4Rent application is now live! 🎉**
