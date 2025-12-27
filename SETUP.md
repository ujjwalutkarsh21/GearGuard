# GearGuard Setup Instructions

## Prerequisites Checklist

- ✅ Node.js v14+ installed
- ✅ npm or yarn installed
- ✅ MongoDB installed or MongoDB Atlas account
- ✅ Git installed (optional)
- ✅ A code editor (VS Code recommended)

## Installation Steps

### 1. Backend Setup

```bash
# Navigate to Backend folder
cd Backend

# Install dependencies
npm install

# Create .env file (if not exists)
# Update MongoDB URI if needed
```

**Backend .env File:**

```
MONGODB_URI=mongodb://localhost:27017/gearguard
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_change_in_production
```

**Start Backend:**

```bash
npm run dev
```

✅ Backend should be running on http://localhost:5000

---

### 2. Frontend Setup

In a **new terminal**:

```bash
# Navigate to Frontend folder
cd Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ Frontend should be running on http://localhost:5173

---

## Verifying Installation

### Check Backend

```bash
curl http://localhost:5000/api/health
# Expected response: {"message":"GearGuard API is running"}
```

### Check Frontend

Open browser and go to:

```
http://localhost:5173
```

You should see the Login page.

---

## Creating Sample Data

### 1. First User (via API)

```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@gearguard.com",
    "password": "Admin@123",
    "fullName": "Admin User",
    "role": "Admin",
    "department": "Management"
  }'
```

### 2. Login to Get Token

```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@gearguard.com",
    "password": "Admin@123"
  }'
```

Save the token from response.

### 3. Create Teams

```bash
curl -X POST http://localhost:5000/api/teams \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Mechanics",
    "description": "Mechanical equipment maintenance"
  }'
```

Repeat for "Electricians" and "IT Support"

### 4. Create Sample Equipment

```bash
curl -X POST http://localhost:5000/api/equipment \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "CNC Machine 01",
    "serialNumber": "CNC-2024-001",
    "category": "CNC Machine",
    "department": "Production",
    "assignedEmployee": "John Smith",
    "purchaseDate": "2023-01-15",
    "warrantyExpiration": "2025-01-15",
    "location": "Factory Floor - Section A"
  }'
```

---

## Common Issues & Solutions

### Issue: "Module not found" error

**Solution:**

```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### Issue: MongoDB connection error

**Solution 1 - Local MongoDB:**

```bash
# Windows
mongod

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Solution 2 - MongoDB Atlas (Cloud):**

1. Create account at mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Update Backend/.env:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gearguard
```

### Issue: Port 5000 or 5173 already in use

**Solution:**

```bash
# Windows - Find and kill process
netstat -ano | findstr :5000
taskkill /PID PID_NUMBER /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
lsof -ti:5173 | xargs kill -9
```

Or change port in .env:

```
PORT=5001  # for backend
```

### Issue: CORS errors

**Make sure:**

1. Backend is running
2. Frontend uses correct API URL (http://localhost:5000)
3. Clear browser cache (Ctrl+Shift+Del)

---

## Project Structure Overview

```
Backend/
├── src/
│   ├── models/           # Database schemas
│   │   ├── Equipment.js
│   │   ├── MaintenanceRequest.js
│   │   ├── MaintenanceTeam.js
│   │   └── User.js
│   ├── controllers/      # API logic
│   │   ├── equipmentController.js
│   │   ├── maintenanceController.js
│   │   ├── teamController.js
│   │   └── userController.js
│   ├── routes/           # API endpoints
│   │   ├── equipmentRoutes.js
│   │   ├── maintenanceRoutes.js
│   │   ├── teamRoutes.js
│   │   └── userRoutes.js
│   ├── middleware/       # Auth & error handling
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── utils/
│   │   └── db.js         # Database connection
│   └── index.js          # Main server file
├── .env                  # Environment variables
└── package.json

Frontend/
├── src/
│   ├── pages/            # Page components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── KanbanBoard.jsx
│   │   ├── Calendar.jsx
│   │   └── Equipment.jsx
│   ├── components/       # Reusable components
│   │   ├── Navbar.jsx
│   │   └── CreateRequest.jsx
│   ├── services/         # API integration
│   │   └── api.js
│   ├── context/          # State management
│   │   ├── AuthContext.jsx
│   │   └── DataContext.jsx
│   ├── styles/           # CSS files
│   │   ├── Auth.css
│   │   ├── Dashboard.css
│   │   ├── Kanban.css
│   │   ├── Calendar.css
│   │   ├── Equipment.css
│   │   ├── Navbar.css
│   │   ├── MainLayout.css
│   │   └── CreateRequest.css
│   ├── layouts/
│   │   └── MainLayout.jsx
│   ├── utils/
│   │   └── helpers.js
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── vite.config.js
└── package.json
```

---

## Development Workflow

1. **Make changes** in code
2. **Frontend** auto-reloads (Vite)
3. **Backend** requires manual restart (use `npm run dev` with nodemon)
4. **Check browser** for updates

---

## Building for Production

### Backend Build

```bash
cd Backend
npm install --production
npm start
```

### Frontend Build

```bash
cd Frontend
npm run build
# Creates dist/ folder with optimized files
```

---

## Deployment Options

### Backend Deployment (Heroku Example)

```bash
# Create Heroku app
heroku create gearguard-api

# Set environment variables
heroku config:set JWT_SECRET=your_key
heroku config:set MONGODB_URI=your_mongodb_uri

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel Example)

```bash
npm install -g vercel
cd Frontend
vercel --prod
```

---

## Useful Commands

### Backend

```bash
npm run dev          # Start development server
npm start            # Start production server
npm test             # Run tests (when added)
```

### Frontend

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## Security Notes

⚠️ **Important for Production:**

1. Change JWT_SECRET in .env
2. Use strong MongoDB passwords
3. Enable HTTPS
4. Add rate limiting
5. Implement CORS properly
6. Never commit .env file
7. Use environment-specific configs

---

## Support & Resources

- **MongoDB Docs**: https://docs.mongodb.com
- **Express.js Docs**: https://expressjs.com
- **React Docs**: https://react.dev
- **Vite Docs**: https://vitejs.dev

---

**Now you're ready to use GearGuard! 🚀**

Start with the Quick Start guide for first steps.
