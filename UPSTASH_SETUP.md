# Upstash Redis Setup Guide

This guide will help you set up Upstash Redis for your download counter.

## Why Upstash Redis?

- ✅ **Atomic Operations**: `INCR` command is atomic - no race conditions
- ✅ **Serverless-Friendly**: Works perfectly with multiple instances/serverless functions
- ✅ **Free Tier**: 10,000 commands/day free
- ✅ **Fast**: Low latency, global edge network
- ✅ **Easy Setup**: Just need API keys

## Step 1: Create Upstash Redis Database

1. Go to [Upstash Console](https://console.upstash.com/)
2. Sign up or log in (free account)
3. Click **"Create Database"**
4. Choose:
   - **Type**: Redis
   - **Region**: Choose closest to your server (or your Vercel region)
   - **Name**: `shakshuka-downloads` (or any name)
5. Click **"Create"**

## Step 2: Get Your Credentials

1. After creating the database, click on it
2. You'll see:
   - **UPSTASH_REDIS_REST_URL**: Something like `https://xxx.upstash.io`
   - **UPSTASH_REDIS_REST_TOKEN**: A long token string

## Step 3: Add Environment Variables

### For Vercel:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these two variables:
   - `UPSTASH_REDIS_REST_URL` = `https://xxx.upstash.io`
   - `UPSTASH_REDIS_REST_TOKEN` = `your-token-here`
4. Select **Production**, **Preview**, and **Development** environments
5. Click **"Save"**
6. **Redeploy** your application for changes to take effect

### For Local Development:

Create a `.env.local` file in your project root:

```env
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token-here
```

## Step 4: Install the Package

Run this command in your project:

```bash
npm install @upstash/redis
```

Or if using yarn:

```bash
yarn add @upstash/redis
```

## Step 5: Deploy

After setting up the environment variables, deploy your application. The counter will now work correctly across all instances!

## How It Works

- The `INCR` command in Redis is **atomic** - it guarantees that even if multiple requests come in simultaneously, each increment is counted correctly
- Works across **all serverless instances** - no more inconsistent counts!
- Falls back to file system if Redis is not configured (for local development)

## Testing

1. Deploy to production
2. Click download button multiple times quickly
3. Reload the page - counts should be consistent!
4. Check Upstash dashboard to see the counter values

## Troubleshooting

**Issue**: Counts still inconsistent
- Make sure environment variables are set correctly
- Check that you redeployed after adding env vars
- Verify Redis connection in Upstash dashboard

**Issue**: Local development not working
- Make sure `.env.local` file exists with correct values
- Restart your dev server after adding env vars

## Alternative: Vercel KV

If you're on Vercel, you can also use **Vercel KV** (which is built on Upstash):
1. Go to Vercel Dashboard → Storage → Create KV Database
2. Use `@vercel/kv` package instead
3. Very similar setup

