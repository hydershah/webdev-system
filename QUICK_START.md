# Quick Start Guide

## Your Database is Ready! ✅

Everything is set up and configured. Here's how to use it:

---

## Running the Application

### Option 1: Run Everything Together (Recommended)
```bash
npm start
```

This starts:
- Frontend on `http://localhost:5173`
- Backend API on `http://localhost:3001`

### Option 2: Run Separately
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run server
```

---

## What Was Set Up

✅ **Express Backend Server** - Running on port 3001
✅ **MongoDB Database** - Local database named `webdev-questionnaire`
✅ **API Endpoints** - Ready to accept questionnaire submissions
✅ **Frontend Integration** - Form now saves to database

---

## Testing the Setup

### 1. Fill Out the Questionnaire
1. Open `http://localhost:5173` in your browser
2. Fill out the questionnaire form (only name, email, and company are required)
3. Click "Submit Project"
4. You should see the success message!

### 2. Verify Data Was Saved

**Using MongoDB Compass (GUI - Recommended):**
1. Download [MongoDB Compass](https://www.mongodb.com/products/compass) if you don't have it
2. Connect to: `mongodb://localhost:27017`
3. Look for database: `webdev-questionnaire`
4. Check the `questionnaires` collection
5. You'll see your submitted form data!

**Using Command Line:**
```bash
mongosh
use webdev-questionnaire
db.questionnaires.find().pretty()
```

### 3. Test API Directly

**Health Check:**
```bash
curl http://localhost:3001/api/health
```

**Get All Submissions:**
```bash
curl http://localhost:3001/api/questionnaire/all
```

---

## Database Schema

Each questionnaire submission includes:

**Contact Info:** fullName, email, companyName, phoneNumber
**Business:** industry, description, target audience, goals
**Design:** website type, colors, layout, typography, animations
**Pages:** common pages, estimated page count
**Features:** selected features, custom requirements
**Content:** logo status, content readiness, images
**Technical:** hosting, domain, CMS preference, tech stack
**SEO:** keywords, competitors, performance expectations
**Timeline:** budget, timeline, maintenance plan
**Metadata:** submission timestamp, status (new/in-progress/completed)

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/questionnaire/submit` | Submit new questionnaire |
| GET | `/api/questionnaire/all` | Get all submissions |
| GET | `/api/questionnaire/:id` | Get single submission |
| PATCH | `/api/questionnaire/:id/status` | Update status |
| DELETE | `/api/questionnaire/:id` | Delete submission |

---

## Project Structure

```
webdev-system/
├── server/
│   ├── index.js                    # Express server
│   ├── models/
│   │   └── Questionnaire.js        # MongoDB schema
│   └── routes/
│       └── questionnaire.js        # API endpoints
├── src/
│   └── components/
│       └── QuestionnaireForm.jsx   # Frontend form (updated)
├── .env                            # Environment config
└── package.json                    # Updated with server scripts
```

---

## Environment Variables

Your `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/webdev-questionnaire
PORT=3001
```

**Note:** Port 5000 was changed to 3001 because macOS uses port 5000 for AirPlay.

---

## Next Steps

### Build an Admin Dashboard (Optional)
You can create a simple admin page to:
- View all submissions
- Filter by status (new/in-progress/completed)
- Update status
- Export to CSV/PDF

### Deploy to Production
When ready to deploy:
1. Use MongoDB Atlas (cloud database)
2. Update `MONGODB_URI` in `.env`
3. Deploy backend to Heroku/Railway/Vercel
4. Deploy frontend to Vercel/Netlify
5. Update API URL in frontend to production URL

---

## Troubleshooting

**Server won't start:**
- Make sure MongoDB is running: `brew services list | grep mongodb`
- Check if port 3001 is available: `lsof -i :3001`

**Database connection error:**
- Restart MongoDB: `brew services restart mongodb-community`
- Check connection string in `.env`

**Form submission fails:**
- Verify backend is running on port 3001
- Check browser console for errors
- Verify CORS is enabled in server

---

## Need More Help?

See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for detailed setup instructions.

---

**Everything is ready to go! Just run `npm start` and start collecting questionnaire submissions! 🚀**
