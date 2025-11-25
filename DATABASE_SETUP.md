# Database Setup Guide

## Overview

This project uses **MongoDB** to store questionnaire submissions. You have two options:

1. **Local MongoDB** (recommended for development)
2. **MongoDB Atlas** (cloud-based, free tier available)

---

## Option 1: Local MongoDB Setup

### 1. Install MongoDB

**macOS (using Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
```

**Ubuntu/Debian:**
```bash
sudo apt-get install mongodb
```

**Windows:**
Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)

### 2. Start MongoDB Service

**macOS:**
```bash
brew services start mongodb-community
```

**Ubuntu/Debian:**
```bash
sudo systemctl start mongodb
```

**Windows:**
MongoDB should start automatically as a service.

### 3. Verify MongoDB is Running

```bash
mongosh
# If this connects successfully, MongoDB is running!
# Type 'exit' to quit
```

### 4. Your `.env` file should have:
```
MONGODB_URI=mongodb://localhost:27017/webdev-questionnaire
PORT=5000
```

---

## Option 2: MongoDB Atlas (Cloud) Setup

### 1. Create a Free MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (choose the FREE tier)

### 2. Create Database User

1. Go to **Database Access** in the sidebar
2. Click **Add New Database User**
3. Choose **Password** authentication
4. Set username and password (save these!)
5. Grant **Read and write to any database** permissions

### 3. Whitelist Your IP Address

1. Go to **Network Access** in the sidebar
2. Click **Add IP Address**
3. For development, you can click **Allow Access from Anywhere** (0.0.0.0/0)
   - ⚠️ For production, use specific IP addresses

### 4. Get Your Connection String

1. Go to **Database** in the sidebar
2. Click **Connect** on your cluster
3. Choose **Connect your application**
4. Copy the connection string (looks like: `mongodb+srv://username:<password>@cluster...`)

### 5. Update Your `.env` file:

```
MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/webdev-questionnaire?retryWrites=true&w=majority
PORT=5000
```

Replace:
- `yourusername` with your database username
- `yourpassword` with your database password
- `cluster0.xxxxx` with your actual cluster address

---

## Running the Application

### 1. Install Dependencies (if you haven't already)
```bash
npm install
```

### 2. Start Both Frontend and Backend
```bash
npm start
```

This will start:
- Frontend on `http://localhost:5173`
- Backend API on `http://localhost:5000`

Or run them separately:
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run server
```

---

## Testing the Database Connection

### 1. Start the server:
```bash
npm run server
```

You should see:
```
🚀 Server running on http://localhost:5000
✅ Connected to MongoDB
```

### 2. Test the health endpoint:
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{"status":"ok","message":"Server is running"}
```

---

## Viewing Your Data

### Using MongoDB Compass (GUI)

1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect using your connection string
3. Browse the `webdev-questionnaire` database
4. View the `questionnaires` collection

### Using Command Line

**Local MongoDB:**
```bash
mongosh
use webdev-questionnaire
db.questionnaires.find().pretty()
```

**MongoDB Atlas:**
```bash
mongosh "your-connection-string"
use webdev-questionnaire
db.questionnaires.find().pretty()
```

---

## API Endpoints

Once your server is running, you have these endpoints:

### Submit Questionnaire
```http
POST http://localhost:5000/api/questionnaire/submit
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "companyName": "Acme Inc",
  ...
}
```

### Get All Submissions
```http
GET http://localhost:5000/api/questionnaire/all
```

### Get Single Submission
```http
GET http://localhost:5000/api/questionnaire/:id
```

### Update Status
```http
PATCH http://localhost:5000/api/questionnaire/:id/status
Content-Type: application/json

{
  "status": "in-progress"
}
```

### Delete Submission
```http
DELETE http://localhost:5000/api/questionnaire/:id
```

---

## Troubleshooting

### Error: "MongoDB connection error"

**Check if MongoDB is running:**
```bash
# macOS
brew services list

# Ubuntu/Debian
sudo systemctl status mongodb
```

**Restart MongoDB:**
```bash
# macOS
brew services restart mongodb-community

# Ubuntu/Debian
sudo systemctl restart mongodb
```

### Error: "Failed to submit questionnaire"

1. Make sure the backend server is running (`npm run server`)
2. Check the console for error messages
3. Verify your `.env` file has the correct `MONGODB_URI`

### Error: "Network error"

1. Verify both frontend and backend are running
2. Check if backend is on port 5000: `curl http://localhost:5000/api/health`
3. Check browser console for CORS errors

---

## Next Steps

- ✅ Database is set up and connected
- ✅ Frontend submits to backend
- ✅ Data is saved to MongoDB

You can now:
1. Fill out the questionnaire form
2. Submit it
3. View saved submissions in MongoDB Compass or command line
4. Build an admin dashboard to view all submissions (future enhancement)

---

## Security Notes for Production

When deploying to production:

1. ✅ Use MongoDB Atlas (not local MongoDB)
2. ✅ Set specific IP whitelist (not 0.0.0.0/0)
3. ✅ Use strong database passwords
4. ✅ Add rate limiting to API endpoints
5. ✅ Add authentication to admin endpoints
6. ✅ Enable HTTPS
7. ✅ Set proper CORS origins (not '*')
