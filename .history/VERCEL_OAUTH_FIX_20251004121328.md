# 🔧 Fix OAuth on Vercel - Step by Step Guide

## 🚨 The Problem
Your OAuth works locally but fails on Vercel. This is because environment variables are different between local and production.

## ✅ Solution Steps

### Step 1: Check Your Current Local Environment
Run this command to see what environment variables you have locally:
```bash
# Check if you have environment variables set
echo $NEXTAUTH_URL
echo $GOOGLE_CLIENT_ID
echo $NEXTAUTH_SECRET
```

### Step 2: Set Up Vercel Environment Variables
Go to your Vercel dashboard and add these environment variables:

#### Required Variables:
```
NEXTAUTH_URL = https://4rent-lk-66uy.vercel.app
NEXTAUTH_SECRET = a643141fc894352e3e085dee6305e5edd0e3e6279d6cc6b1d2208b51c03d9bf0
GOOGLE_CLIENT_ID = [your-google-client-id]
GOOGLE_CLIENT_SECRET = [your-google-client-secret]
```

#### Optional Variables (if you use them):
```
GITHUB_ID = [your-github-client-id]
GITHUB_SECRET = [your-github-client-secret]
DATABASE_URL = [your-mongodb-connection-string]
```

### Step 3: Update Google OAuth Console
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Select your OAuth 2.0 Client ID
4. Add these **Authorized redirect URIs**:
   ```
   http://localhost:3000/api/auth/callback/google
   https://4rent-lk-66uy.vercel.app/api/auth/callback/google
   ```
5. Add these **Authorized JavaScript origins**:
   ```
   http://localhost:3000
   https://4rent-lk-66uy.vercel.app
   ```

### Step 4: Create Local .env.local File
Create a `.env.local` file in your project root with your actual values:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=a643141fc894352e3e085dee6305e5edd0e3e6279d6cc6b1d2208b51c03d9bf0

# Database
DATABASE_URL=your-actual-mongodb-connection-string

# OAuth Providers
GOOGLE_CLIENT_ID=your-actual-google-client-id
GOOGLE_CLIENT_SECRET=your-actual-google-client-secret
GITHUB_ID=your-actual-github-client-id
GITHUB_SECRET=your-actual-github-client-secret
```

### Step 5: Redeploy
After setting up environment variables:
1. Go to Vercel dashboard
2. Click "Redeploy" on your latest deployment
3. Or push a new commit to trigger redeploy

### Step 6: Test
1. Visit: https://4rent-lk-66uy.vercel.app/test-oauth
2. Try Google sign-in
3. Check browser console for errors

## 🔍 Debugging Commands

### Check Environment Variables in Vercel:
```bash
# Add this to your code temporarily to debug
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
console.log('GOOGLE_CLIENT_ID exists:', !!process.env.GOOGLE_CLIENT_ID);
console.log('NEXTAUTH_SECRET exists:', !!process.env.NEXTAUTH_SECRET);
```

### Test OAuth Endpoints:
- Auth endpoint: https://4rent-lk-66uy.vercel.app/api/auth/providers
- Sign in: https://4rent-lk-66uy.vercel.app/api/auth/signin

## 🚨 Common Issues

1. **Missing NEXTAUTH_URL**: Must be exactly `https://4rent-lk-66uy.vercel.app`
2. **Wrong Google Console URIs**: Must include both localhost and production URLs
3. **NEXTAUTH_SECRET mismatch**: Use the same secret in both environments
4. **Environment variables not set**: Double-check Vercel dashboard

## 📞 Quick Fix Checklist

- [ ] NEXTAUTH_URL set to `https://4rent-lk-66uy.vercel.app` in Vercel
- [ ] NEXTAUTH_SECRET set in Vercel (same as local)
- [ ] GOOGLE_CLIENT_ID set in Vercel (same as local)
- [ ] GOOGLE_CLIENT_SECRET set in Vercel (same as local)
- [ ] Google Console has correct redirect URIs
- [ ] Redeployed after setting environment variables
- [ ] Tested OAuth flow on production

## 🎯 Expected Result
After completing these steps, your Google OAuth should work on both:
- Local: http://localhost:3000
- Production: https://4rent-lk-66uy.vercel.app
