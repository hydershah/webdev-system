# PostgreSQL Migration Complete! ✅

Your application has been successfully migrated from MongoDB to PostgreSQL (Railway).

---

## What Changed

### Database
- **Before:** MongoDB (local or Atlas)
- **After:** PostgreSQL (Railway cloud database)

### ORM
- **Before:** Mongoose
- **After:** Sequelize

### Connection
- Railway PostgreSQL database at: `shinkansen.proxy.rlwy.net:43988`
- Database name: `railway`

---

## Quick Start

### 1. Run Migration (Already Done ✅)
```bash
npm run migrate
```

This creates the `questionnaires` table in your PostgreSQL database.

### 2. Start the Application
```bash
npm start
```

This starts both:
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:3001](http://localhost:3001)

---

## Database Schema

The `questionnaires` table includes all fields from the form:

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key (auto-generated) |
| fullName | STRING | Required |
| email | STRING | Required, validated |
| companyName | STRING | Required |
| phoneNumber | STRING | Optional |
| industry | STRING | Business industry |
| businessDescription | TEXT | About the business |
| referenceWebsites | JSONB | Array of {url, whatYouLike} |
| dislikedWebsites | JSONB | Array of {url, whatYouDislike} |
| designKeywords | ARRAY(STRING) | Design preferences |
| features | ARRAY(STRING) | Selected features |
| status | ENUM | 'new', 'in-progress', 'completed', 'archived' |
| createdAt | TIMESTAMP | Auto-generated |
| updatedAt | TIMESTAMP | Auto-updated |
| ... | ... | And many more fields |

**Total Fields:** 60+ fields covering all aspects of the questionnaire

---

## API Endpoints

All endpoints remain the same:

### Submit Questionnaire
```http
POST http://localhost:3001/api/questionnaire/submit
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "companyName": "Acme Inc",
  ...
}
```

**Response:**
```json
{
  "success": true,
  "message": "Questionnaire submitted successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "fullName": "John Doe",
    ...
  }
}
```

### Get All Submissions
```http
GET http://localhost:3001/api/questionnaire/all
```

### Get Single Submission
```http
GET http://localhost:3001/api/questionnaire/:id
```

### Update Status
```http
PATCH http://localhost:3001/api/questionnaire/:id/status
Content-Type: application/json

{
  "status": "in-progress"
}
```

### Delete Submission
```http
DELETE http://localhost:3001/api/questionnaire/:id
```

---

## Viewing Your Data

### Option 1: Using pgAdmin (Recommended)

1. Download [pgAdmin](https://www.pgadmin.org/download/)
2. Create new server connection:
   - **Host:** shinkansen.proxy.rlwy.net
   - **Port:** 43988
   - **Database:** railway
   - **Username:** postgres
   - **Password:** YiSAllnccXXxEvFUDTjhDxxOFFNxIyNi
3. Navigate to: railway → Schemas → public → Tables → questionnaires
4. Right-click → View/Edit Data

### Option 2: Using Railway Dashboard

1. Go to [Railway Dashboard](https://railway.app)
2. Open your project
3. Click on PostgreSQL service
4. Click "Data" tab
5. Run SQL queries:
   ```sql
   SELECT * FROM questionnaires ORDER BY "createdAt" DESC;
   ```

### Option 3: Using Command Line (psql)

```bash
psql postgresql://postgres:YiSAllnccXXxEvFUDTjhDxxOFFNxIyNi@shinkansen.proxy.rlwy.net:43988/railway
```

Then run:
```sql
\dt                                           -- List all tables
SELECT * FROM questionnaires;                 -- View all submissions
SELECT COUNT(*) FROM questionnaires;          -- Count submissions
SELECT * FROM questionnaires WHERE status = 'new';  -- Filter by status
```

---

## Differences Between Sequelize and Mongoose

### Creating Records

**MongoDB (Mongoose):**
```javascript
const doc = new Model(data)
await doc.save()
```

**PostgreSQL (Sequelize):**
```javascript
const doc = await Model.create(data)
```

### Finding Records

**MongoDB (Mongoose):**
```javascript
await Model.find().sort({ createdAt: -1 })
await Model.findById(id)
```

**PostgreSQL (Sequelize):**
```javascript
await Model.findAll({ order: [['createdAt', 'DESC']] })
await Model.findByPk(id)
```

### Updating Records

**MongoDB (Mongoose):**
```javascript
await Model.findByIdAndUpdate(id, { status: 'new' }, { new: true })
```

**PostgreSQL (Sequelize):**
```javascript
const doc = await Model.findByPk(id)
doc.status = 'new'
await doc.save()
```

### Deleting Records

**MongoDB (Mongoose):**
```javascript
await Model.findByIdAndDelete(id)
```

**PostgreSQL (Sequelize):**
```javascript
const doc = await Model.findByPk(id)
await doc.destroy()
```

---

## Data Types Comparison

| MongoDB | PostgreSQL | Use Case |
|---------|-----------|----------|
| String | STRING/TEXT | Short/long text |
| Array | ARRAY(TYPE) | List of values |
| Object | JSONB | Nested objects |
| Boolean | BOOLEAN | True/false |
| Date | DATE/TIMESTAMP | Dates |
| ObjectId | UUID | Unique IDs |

---

## Environment Variables

Your `.env` file now uses:

```env
# PostgreSQL Connection String (Railway)
DATABASE_URL=postgresql://postgres:YiSAllnccXXxEvFUDTjhDxxOFFNxIyNi@shinkansen.proxy.rlwy.net:43988/railway

# Server Port
PORT=3001
```

---

## File Structure

```
webdev-system/
├── server/
│   ├── index.js                    # Updated for PostgreSQL
│   ├── database.js                 # Sequelize connection
│   └── routes/
│       └── questionnaire.js        # Updated API routes
├── models/
│   └── Questionnaire.js            # Sequelize model
├── migrations/
│   └── 20251125-create-questionnaire.cjs  # Database migration
├── scripts/
│   └── migrate.js                  # Migration runner
├── .env                            # PostgreSQL connection
└── package.json                    # Updated with migrate script
```

---

## Available Scripts

```bash
npm start          # Start frontend + backend
npm run dev        # Start frontend only
npm run server     # Start backend only
npm run migrate    # Run database migrations
```

---

## Benefits of PostgreSQL

✅ **Production-Ready:** PostgreSQL is battle-tested for enterprise applications
✅ **Cloud-Hosted:** Your database is on Railway's infrastructure
✅ **ACID Compliant:** Guaranteed data consistency
✅ **Advanced Features:** Full-text search, JSON support, complex queries
✅ **Scalable:** Easy to upgrade as your needs grow
✅ **SQL Standards:** Industry-standard query language
✅ **Better for Relational Data:** When you add user accounts, projects, etc.

---

## Testing the Migration

### 1. Test Connection
```bash
curl http://localhost:3001/api/health
```

Expected:
```json
{"status":"ok","message":"Server is running"}
```

### 2. Submit Test Data
Use the frontend form at `http://localhost:5173` or send a POST request:

```bash
curl -X POST http://localhost:3001/api/questionnaire/submit \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "companyName": "Test Company"
  }'
```

### 3. Verify Data Was Saved
```bash
curl http://localhost:3001/api/questionnaire/all
```

---

## Troubleshooting

### Error: "Unable to connect to the database"

Check your `.env` file has the correct DATABASE_URL.

### Error: "relation 'questionnaires' does not exist"

Run the migration:
```bash
npm run migrate
```

### Frontend shows network error

Make sure the backend is running:
```bash
npm run server
```

---

## Security Notes

⚠️ **Important:** Your database credentials are in the `.env` file. This file is in `.gitignore` so it won't be committed to git. Never share these credentials publicly.

For production:
- Rotate database password regularly
- Use environment variables in hosting platform
- Enable SSL for database connections (already configured ✅)
- Add rate limiting to API endpoints

---

## Next Steps

1. ✅ **Migration Complete** - PostgreSQL is set up and working
2. ✅ **Frontend Connected** - Form submits to PostgreSQL
3. ✅ **Data Persisted** - All submissions saved to cloud database

**You're all set! Start collecting questionnaire submissions on PostgreSQL! 🚀**

---

## Need Help?

- Railway Docs: [docs.railway.app](https://docs.railway.app)
- Sequelize Docs: [sequelize.org](https://sequelize.org)
- PostgreSQL Docs: [postgresql.org/docs](https://www.postgresql.org/docs/)
