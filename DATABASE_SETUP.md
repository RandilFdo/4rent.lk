# 🗄️ MongoDB Atlas Setup Guide

## Step 1: Create MongoDB Atlas Account

1. Go to [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Choose the **FREE tier** (M0 Sandbox)

## Step 2: Create a Cluster

1. Click "Build a Database"
2. Choose **FREE** tier (M0)
3. Select a cloud provider and region (choose closest to you)
   - AWS / Google Cloud / Azure
   - Region: Choose Singapore or Mumbai for Sri Lanka
4. Click "Create Cluster"
5. Wait for cluster to deploy (2-3 minutes)

## Step 3: Create Database User

1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create username and password:
   - Username: `4rent_admin` (or any name you prefer)
   - Password: Generate a strong password (save it!)
5. Set "Database User Privileges" to "Read and write to any database"
6. Click "Add User"

## Step 4: Configure Network Access

1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0)
   - This is needed for Vercel to access your database
4. Click "Confirm"

## Step 5: Get Connection String

1. Go back to "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select:
   - Driver: Node.js
   - Version: 5.5 or later
5. Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace:
   - `<username>` with your database username
   - `<password>` with your database password
   - Add `/4rent` before the `?` to specify database name:
   ```
   mongodb+srv://4rent_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/4rent?retryWrites=true&w=majority
   ```

## Step 6: Add to Vercel Environment Variables

1. Go to Vercel dashboard: https://vercel.com/dashboard
2. Select your project (4rent-lk-66uy)
3. Go to "Settings" → "Environment Variables"
4. Add the following variables:

### Required Environment Variables:

```env
# Database
DATABASE_URL=mongodb+srv://4rent_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/4rent?retryWrites=true&w=majority

# NextAuth
NEXTAUTH_URL=https://4rent-lk-66uy.vercel.app
NEXTAUTH_SECRET=your-super-secret-key-here-at-least-32-characters-long

# GitHub OAuth (Optional - for GitHub login)
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret

# Google OAuth (Optional - for Google login)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Cloudinary (for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-cloudinary-preset
```

### Generate NEXTAUTH_SECRET:

Run this command in your terminal:
```bash
openssl rand -base64 32
```

Or use this Node.js command:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Step 7: Push Database Schema

After adding environment variables to Vercel:

1. Go to your local project terminal
2. Update your `.env.local` file with the same DATABASE_URL
3. Run Prisma commands:

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to MongoDB
npx prisma db push
```

## Step 8: Redeploy on Vercel

1. After adding environment variables, trigger a new deployment:
   - Option A: Push a new commit to GitHub
   - Option B: In Vercel dashboard → Deployments → Click "Redeploy"

2. Wait for deployment to complete

## Step 9: Test Your Application

1. Visit your app: https://4rent-lk-66uy.vercel.app
2. Try to:
   - Register a new account
   - Login
   - Create a listing
   - View listings

## Troubleshooting

### Issue: "PrismaClient is unable to connect to database"
- Check that your IP is whitelisted (0.0.0.0/0)
- Verify database user credentials
- Ensure connection string is correct

### Issue: "Authentication failed"
- Check username and password in connection string
- Make sure password is URL-encoded if it contains special characters
- Use online tool: https://www.urlencoder.org/

### Issue: "Cannot find module '@prisma/client'"
- Run `npm install` locally
- Run `npx prisma generate`
- Redeploy to Vercel

## Next Steps: Cloudinary Setup (for Images)

1. Sign up at https://cloudinary.com (free tier available)
2. Get your Cloud Name from dashboard
3. Create an upload preset:
   - Settings → Upload → Upload presets
   - Add preset, set to "Unsigned"
   - Copy the preset name
4. Add to Vercel environment variables:
   ```
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-preset-name
   ```

## Optional: OAuth Setup

### GitHub OAuth:
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create new OAuth App
3. Set Authorization callback URL: `https://4rent-lk-66uy.vercel.app/api/auth/callback/github`
4. Copy Client ID and Client Secret to Vercel

### Google OAuth:
1. Go to Google Cloud Console
2. Create project → Enable Google+ API
3. Create OAuth credentials
4. Set Authorized redirect URI: `https://4rent-lk-66uy.vercel.app/api/auth/callback/google`
5. Copy Client ID and Client Secret to Vercel

---

**After completing these steps, your application will be fully functional with database connectivity! 🎉**
