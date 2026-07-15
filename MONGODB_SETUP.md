# MongoDB Atlas Setup Guide

This guide will help you set up MongoDB Atlas for your download counter.

## Step 1: Create a MongoDB Atlas Database

1. Go to [MongoDB Atlas Console](https://www.mongodb.com/cloud/atlas/register)
2. Sign up or log in (free tier is available)
3. Create a new cluster (select the Shared free tier)
4. Choose your cloud provider and region, then click **Create**
5. Set up your database credentials (username and password) and white-list your IP address (or set it to `0.0.0.0/0` to allow connections from anywhere, e.g., Vercel)

## Step 2: Get Your Credentials

1. In your Atlas dashboard, click **Connect** on your Database Deployment (Cluster)
2. Choose **Drivers** (or Node.js connection string)
3. Copy the connection string. It will look like this:
   `mongodb+srv://<username>:<password>@cluster0.xxxxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
4. Replace `<password>` with the password you created for your database user

## Step 3: Configure Environment Variables

1. Open your `.env.local` file in the root of your project
2. Remove any Upstash variables (if you had them):
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
3. Add your MongoDB connection URI (you can name the database in the URL path, e.g., `/shakshuka`):
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxxx.mongodb.net/shakshuka?retryWrites=true&w=majority
   ```

## Step 4: Verification

Start your local development server:
```bash
npm run dev
```

Visit the application or test the API endpoint directly by performing a download click. The `downloads` collection will be created automatically in your database and updated atomically.
