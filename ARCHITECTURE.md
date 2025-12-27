# 🔧 GearGuard - Project Architecture Overview

## 📐 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
│                    (React + Vite Frontend)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Pages:                 Components:           Services:         │
│  • Dashboard           • Navbar              • API Client       │
│  • Kanban Board        • CreateRequest       • Equipment        │
│  • Calendar            • Auth Forms          • Maintenance      │
│  • Equipment List                           • Teams            │
│                                              • Users            │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                    Context (State Management)                    │
│  • AuthContext (User, Token, Login/Logout)                     │
│  • DataContext (Equipment, Requests, Teams)                    │
├─────────────────────────────────────────────────────────────────┤

        ↓ HTTP/REST API Calls (JSON)

┌─────────────────────────────────────────────────────────────────┐
│                      API LAYER                                   │
│              (Express.js Backend on Port 5000)                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Routes:                Controllers:          Middleware:       │
│  • /equipment          • equipmentController • authMiddleware   │
│  • /maintenance-req    • maintenanceControl  • errorHandler     │
│  • /teams              • teamController                         │
│  • /users              • userController                         │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                      MODELS (Mongoose)                           │
│  • Equipment          • MaintenanceRequest   • User            │
│  • MaintenanceTeam                                             │
├─────────────────────────────────────────────────────────────────┤

        ↓ Database Queries

┌─────────────────────────────────────────────────────────────────┐
│                    DATABASE LAYER                                │
│                  (MongoDB - NoSQL)                               │
├─────────────────────────────────────────────────────────────────┤
│  Collections:                                                     │
│  • equipment          • maintenancerequests                     │
│  • maintenanceteams   • users                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow

### User Authentication Flow

```
User Login
    ↓
[Frontend] Form Data → POST /api/users/login
    ↓
[Backend] Verify Email & Password → Generate JWT
    ↓
[Frontend] Store Token in localStorage
    ↓
[Frontend] Include Token in all API requests
    ↓
[Backend] Verify Token on Protected Routes
    ↓
Access Granted/Denied
```

### Equipment Request Creation Flow

```
Technician Creates Request
    ↓
[Frontend] Fill Form → Select Equipment
    ↓
POST /api/maintenance-requests
    ↓
[Backend] Auto-fill Equipment Category & Team
    ↓
[Backend] Store in Database
    ↓
[Frontend] Update State (DataContext)
    ↓
Update UI (Appears on Dashboard, Kanban, Calendar)
```

### Request Status Update Flow

```
Drag Card on Kanban Board
    ↓
[Frontend] Detect Status Change
    ↓
PUT /api/maintenance-requests/:id (with new status)
    ↓
[Backend] Update Database Record
    ↓
[Backend] Check if Overdue
    ↓
[Frontend] Update UI with New Status
```

---

## 📦 Component Hierarchy

```
App
├── AuthProvider
│   └── DataProvider
│       ├── Route: /login → Login Component
│       ├── Route: /register → Register Component
│       └── Protected Routes
│           ├── Navbar (Top Navigation)
│           └── MainLayout
│               ├── /dashboard → Dashboard
│               ├── /kanban → KanbanBoard
│               ├── /calendar → Calendar
│               └── /equipment → EquipmentList
│                   └── CreateRequest Modal
```

---

## 🎯 Features Matrix

| Feature              | Status      | Component      | Backend Endpoint                |
| -------------------- | ----------- | -------------- | ------------------------------- |
| User Authentication  | ✅ Complete | Login/Register | POST /users/login               |
| Equipment Tracking   | ✅ Complete | Equipment Page | GET /equipment                  |
| Add Equipment        | ✅ Complete | Equipment Form | POST /equipment                 |
| Maintenance Requests | ✅ Complete | Dashboard      | POST /maintenance-requests      |
| Kanban Board         | ✅ Complete | KanbanBoard    | PUT /maintenance-requests/:id   |
| Calendar View        | ✅ Complete | Calendar       | GET /maintenance-requests       |
| Drag & Drop          | ✅ Complete | KanbanBoard    | PATCH /maintenance-requests/:id |
| Status Tracking      | ✅ Complete | All Pages      | PUT /maintenance-requests/:id   |
| Team Management      | ✅ Complete | Backend API    | GET /teams                      |
| Priority Levels      | ✅ Complete | Request Form   | POST /maintenance-requests      |
| Overdue Detection    | ✅ Complete | Dashboard      | isOverdue flag                  |
| Search & Filter      | ✅ Complete | Equipment Page | GET /equipment?search=          |

---

## 🔐 Authentication & Authorization

### JWT Token Structure

```
Header: {
  "alg": "HS256",
  "typ": "JWT"
}

Payload: {
  "userId": "mongoid",
  "role": "Technician|Manager|Admin",
  "iat": 1234567890
}

Signature: HMACSHA256(base64Url(header) + "." + base64Url(payload), secret)
```

### Role Permissions

- **Technician**: View assigned requests, update status, log hours
- **Manager**: Create requests, assign teams, view all requests
- **Admin**: Full system access, manage users and teams

---

## 📊 Database Schema Relationships

```
User ──────→ MaintenanceTeam
  ↓           ↓
  └─→ MaintenanceRequest ←─ Equipment
      └─────→ MaintenanceTeam
              └─→ Equipment
```

### Sample Query Patterns

**Get Equipment with Assigned Team:**

```javascript
equipment.populate("maintenanceTeam").populate("assignedTechnician");
```

**Get All Requests for a Technician:**

```javascript
MaintenanceRequest.find({ assignedTechnician: userId });
```

**Get Overdue Requests:**

```javascript
MaintenanceRequest.find({ isOverdue: true, status: { $ne: "Repaired" } });
```

---

## 🚀 Performance Considerations

### Frontend Optimization

- React Context for state management (no Redux overhead)
- Lazy loading of pages (React Router)
- CSS modules for style isolation
- Local storage caching for auth tokens

### Backend Optimization

- Database indexes on commonly filtered fields
- Pagination for large data sets
- JWT token validation for stateless auth
- CORS for cross-origin requests

---

## 📡 API Rate Limiting (Future)

```
Recommended Limits:
- Login: 5 requests/minute
- General API: 100 requests/minute
- File Upload: 10 requests/minute
```

---

## 🔧 Development Tools

### Debugging

- Browser DevTools (F12)
- Postman for API testing
- MongoDB Compass for database inspection
- VS Code extensions: REST Client, Thunder Client

### Useful Extensions

- **ES7+ React/Redux/React-Native snippets**
- **Prettier** - Code formatter
- **ESLint** - Code linter
- **MongoDB for VS Code**
- **Thunder Client** - API testing

---

## 📈 Scaling Considerations

### Horizontal Scaling

```
Load Balancer
├── Backend Server 1 (Port 5000)
├── Backend Server 2 (Port 5001)
└── Backend Server 3 (Port 5002)
    └── MongoDB (Replica Set)
```

### Database Optimization

- Add indexes on frequently queried fields
- Archive old maintenance records
- Implement caching layer (Redis)

### Frontend Optimization

- CDN for static assets
- Code splitting by routes
- Image compression
- Minification and gzip

---

## 🎨 Design System

### Colors

- **Primary**: #667eea (Purple Blue)
- **Secondary**: #764ba2 (Dark Purple)
- **Success**: #00b96b (Green)
- **Warning**: #ff8c00 (Orange)
- **Error**: #ff4d4f (Red)
- **Background**: #f5f5f5 (Light Gray)

### Typography

- **Font Family**: Segoe UI, Tahoma, Geneva, Verdana
- **Body**: 14px
- **Heading 1**: 32px (bold)
- **Heading 2**: 24px (bold)
- **Heading 3**: 18px (bold)

### Spacing Scale

- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 20px
- **xl**: 30px

---

## 🧪 Testing Strategy

### Frontend Tests (Recommended)

```javascript
// Testing Library + Jest
describe("Dashboard Component", () => {
  test("displays statistics correctly", () => {
    // Test logic
  });
});
```

### Backend Tests (Recommended)

```javascript
// Jest + Supertest
describe("Equipment API", () => {
  test("GET /api/equipment returns all equipment", () => {
    // Test logic
  });
});
```

---

## 📚 Code Standards

### Frontend

```javascript
// Components use PascalCase
const Dashboard = () => {};

// Hooks use camelCase
const [requests, setRequests] = useState([]);

// Constants use UPPER_SNAKE_CASE
const API_BASE_URL = "http://localhost:5000/api";
```

### Backend

```javascript
// Models use PascalCase
const Equipment = require("./Equipment");

// Functions use camelCase
const getEquipmentById = (id) => {};

// Constants use UPPER_SNAKE_CASE
const JWT_SECRET = "secret";
```

---

## 🚨 Error Handling

### Frontend Error Handling

```javascript
try {
  const response = await equipmentService.getAll();
} catch (error) {
  setError(error.message);
  // Show user-friendly error message
}
```

### Backend Error Handling

```javascript
try {
  // API logic
} catch (error) {
  if (error.name === "ValidationError") {
    return res.status(400).json({ message: error.message });
  }
  res.status(500).json({ message: "Internal Server Error" });
}
```

---

## 📝 Logging Strategy

### Frontend Logging

```javascript
console.log("Action performed:", action);
console.error("Error occurred:", error);
console.warn("Warning:", warning);
```

### Backend Logging

```javascript
console.log("MongoDB connected");
console.error("Connection failed:", error);
// Future: Implement Winston or Morgan for production logging
```

---

**Architecture Last Updated**: December 27, 2025

For more details, see the comprehensive documentation in `FULL_DOCUMENTATION.md`
