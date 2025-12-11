## Getting Started
First , Create Upstash Redis Database

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

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

