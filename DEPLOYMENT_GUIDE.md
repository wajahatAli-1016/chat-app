# 🚀 Vercel Deployment Guide

## Prerequisites
- Vercel account
- GitHub repository with your code
- MongoDB Atlas database

## Step 1: Backend Deployment

### 1.1 Deploy Backend to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Select the `backend-chat` folder as the root directory
5. Configure the following settings:
   - **Framework Preset**: Node.js
   - **Build Command**: `npm install`
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

### 1.2 Set Environment Variables
In your Vercel project settings, add these environment variables:
```
MONGODB_URI=mongodb+srv://chat:3TvojW6tr8ohV4XO@cluster1.qgghybq.mongodb.net/
FRONTEND_URL=https://your-frontend-app.vercel.app
JWT_SECRET=your_jwt_secret_key
```

### 1.3 Deploy
Click "Deploy" and wait for the build to complete.

## Step 2: Frontend Deployment

### 2.1 Deploy Frontend to Vercel
1. Create another Vercel project
2. Import the same GitHub repository
3. Select the `frontend-chat` folder as the root directory
4. Configure the following settings:
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

### 2.2 Set Environment Variables
Add these environment variables:
```
REACT_APP_API_URL=https://your-backend-app.vercel.app
REACT_APP_SOCKET_URL=wss://your-backend-app.vercel.app
```

### 2.3 Deploy
Click "Deploy" and wait for the build to complete.

## Step 3: Update URLs

### 3.1 Update Backend CORS
Replace `your-frontend-app.vercel.app` in `backend-chat/index.js` with your actual frontend domain.

### 3.2 Update Frontend Environment
Replace `your-backend-app.vercel.app` in your Vercel environment variables with your actual backend domain.

## Step 4: Test Your Deployment

1. Test the backend API endpoints
2. Test the frontend application
3. Test real-time messaging functionality
4. Test user registration and login

## Troubleshooting

### Common Issues:
1. **CORS Errors**: Make sure your frontend URL is added to the backend CORS configuration
2. **Socket Connection Issues**: Ensure WebSocket URL is correct and uses `wss://` protocol
3. **Database Connection**: Verify MongoDB URI is correct and accessible
4. **Environment Variables**: Double-check all environment variables are set correctly

### Debugging:
- Check Vercel function logs for backend errors
- Check browser console for frontend errors
- Verify all URLs are using HTTPS in production

## Security Notes

1. **Environment Variables**: Never commit sensitive data to your repository
2. **MongoDB**: Ensure your MongoDB cluster allows connections from Vercel's IP ranges
3. **CORS**: Only allow necessary origins in production
4. **JWT Secret**: Use a strong, unique JWT secret in production

## Performance Optimization

1. **Caching**: Vercel automatically caches static assets
2. **CDN**: Vercel provides global CDN for better performance
3. **Database**: Consider using MongoDB Atlas for better performance
4. **Images**: Optimize profile images and use proper formats

## Monitoring

1. **Vercel Analytics**: Enable Vercel Analytics for performance monitoring
2. **Error Tracking**: Set up error tracking for production issues
3. **Database Monitoring**: Monitor MongoDB Atlas performance
4. **Uptime Monitoring**: Set up uptime monitoring for your application 