# Deployment Guide

## Local Development

Run both frontend and backend together:
```bash
npm run start:dev
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## Production Deployment

### Option 1: All-in-one (Recommended for Railway, Heroku, etc.)

1. **Build the frontend:**
   ```bash
   npm run build
   ```

2. **Run migrations:**
   ```bash
   npm run migrate
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

   Or use the combined command:
   ```bash
   npm run production
   ```

The Express server will serve both the API and the built frontend at the same URL.

### Option 2: Separate Deployment

If deploying frontend and backend separately:

1. **Frontend (Vercel, Netlify):**
   - Build: `npm run build`
   - Publish: `dist` folder
   - Set environment variable: `VITE_API_URL=https://your-backend-url.com/api/questionnaire/submit`

2. **Backend (Railway, Heroku):**
   - Start command: `npm start`
   - Ensure CORS is configured for your frontend domain

## Environment Variables

### Backend (.env)
```
PORT=3001
DATABASE_URL=your_postgresql_connection_string
NODE_ENV=production
```

### Frontend
- Development: Uses `.env.development` (points to localhost:3001)
- Production: Uses `.env.production` (uses relative URLs)

## Railway Deployment

1. Push code to GitHub
2. Connect Railway to your repository
3. Set environment variables in Railway dashboard
4. Railway will automatically:
   - Run `npm install`
   - Run `npm start` (which now serves the built frontend)

## Testing Production Build Locally

```bash
npm run build
npm start
```

Visit http://localhost:3001 to see the production build.
