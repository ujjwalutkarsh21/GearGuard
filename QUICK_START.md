# Quick Start Guide - GearGuard

## 🎯 Getting Started in 5 Minutes

### Step 1: Start MongoDB

Make sure MongoDB is running on your system.

```bash
# Windows (if MongoDB is installed locally)
mongod

# Or use MongoDB Atlas cloud service
```

### Step 2: Start Backend Server

```bash
cd Backend
npm install  # Only first time
npm run dev
```

Expected output:

```
MongoDB connected successfully
GearGuard API server running on port 5000
```

### Step 3: Start Frontend Server

In a new terminal:

```bash
cd Frontend
npm install  # Only first time
npm run dev
```

Expected output:

```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

### Step 4: Open in Browser

Navigate to: **http://localhost:5173**

---

## 📝 Default Test Account

Use these credentials to test the application:

- **Email**: admin@gearguard.com
- **Password**: Admin@123
- **Role**: Admin

Or create a new account using the Register page.

---

## 🎨 Using the Application

### 1. **Dashboard** (`/dashboard`)

- View overall statistics
- See recent maintenance requests
- Check maintenance teams overview
- Quick summary of open and completed work

### 2. **Kanban Board** (`/kanban`)

- Drag and drop requests between stages
- Stages: New → In Progress → Repaired → Scrap
- Visual indicators for overdue requests
- Filter by priority or team

### 3. **Calendar** (`/calendar`)

- View preventive maintenance schedule
- Click on dates to see scheduled work
- Monthly navigation
- Plan upcoming maintenance

### 4. **Equipment** (`/equipment`)

- Search and filter equipment
- View detailed equipment information
- Create maintenance requests
- Track equipment status and location

---

## 🔧 API Testing

### Test with Postman or cURL

**Login Endpoint:**

```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@gearguard.com",
    "password": "Admin@123"
  }'
```

**Get Equipment:**

```bash
curl -X GET http://localhost:5000/api/equipment \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📋 Key Features to Try

### Create Equipment

1. Go to Equipment page
2. Click "Add Equipment"
3. Fill in details (Name, Serial, Category, etc.)
4. Save

### Create Maintenance Request

1. Go to Dashboard or Equipment page
2. Click "Create Request" button
3. Select request type (Corrective/Preventive)
4. Set priority and details
5. Save

### Use Kanban Board

1. Go to Kanban Board
2. Drag requests between columns to update status
3. Cards show equipment, type, and priority
4. Red border indicates overdue requests

### Schedule Preventive Maintenance

1. Go to Calendar
2. Click on a date
3. Create "Preventive" type request
4. Set scheduled date
5. Save - it will appear on calendar

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Change port in Backend/.env
PORT=5001

# Or kill process using port
# Windows
netstat -ano | findstr :5000
taskkill /PID YOUR_PID /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### MongoDB Connection Error

```bash
# Make sure MongoDB is running
# Or update MONGODB_URI in .env to use MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gearguard
```

### CORS Error

- Make sure backend is running on port 5000
- Check Backend/.env has CORS enabled
- Clear browser cache

### Module Not Found

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📊 Sample Data

Create some sample data for testing:

### Sample Equipment

```json
{
  "name": "CNC Machine 01",
  "serialNumber": "CNC-2024-001",
  "category": "CNC Machine",
  "department": "Production",
  "assignedEmployee": "John Smith",
  "purchaseDate": "2023-01-15",
  "warrantyExpiration": "2025-01-15",
  "location": "Factory Floor - Section A"
}
```

### Sample Team

```json
{
  "name": "Mechanics",
  "description": "Mechanical equipment maintenance team"
}
```

### Sample Request

```json
{
  "subject": "Leaking oil",
  "type": "Corrective",
  "equipment": "EQUIPMENT_ID",
  "priority": "High",
  "description": "Machine is leaking hydraulic oil from left side",
  "scheduledDate": "2024-12-28T10:00:00"
}
```

---

## 📚 Learn More

- Check `FULL_DOCUMENTATION.md` for complete API reference
- Review database models in `Backend/src/models/`
- Explore components in `Frontend/src/components/`
- Read context providers in `Frontend/src/context/`

---

## 🚀 Next Steps

1. **Customize**: Update colors, logos, and branding
2. **Deploy**: Deploy backend to Heroku/AWS, frontend to Vercel/Netlify
3. **Integrate**: Connect to real MongoDB database
4. **Extend**: Add more features like reports, notifications, etc.

---

## 💡 Tips

- Use browser DevTools (F12) to debug
- Check Network tab to see API calls
- Use Console tab for JavaScript errors
- Backend logs show all API activity

---

**Happy Maintaining! 🔧**

For issues, check the logs or create a GitHub issue.
