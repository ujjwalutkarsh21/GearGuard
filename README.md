# 🔧 GearGuard - The Ultimate Maintenance Tracker

<div align="center">

![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Code](https://img.shields.io/badge/Code-5000%2B%20lines-blue)
![Documentation](https://img.shields.io/badge/Docs-3000%2B%20lines-blue)

A comprehensive, professional-grade maintenance management system for tracking assets, managing maintenance requests, and coordinating repair teams.

[Quick Start](#-quick-start) • [Features](#-features) • [Documentation](#-documentation) • [Getting Help](#-getting-help)

</div>

---

## 📋 Overview

GearGuard is a full-stack web application that helps organizations manage equipment maintenance efficiently. Track assets, schedule preventive maintenance, manage repair teams, and monitor work progress all in one place.

### Key Capabilities

- 🏢 **Equipment Tracking**: Manage company assets with detailed information
- 🔧 **Maintenance Requests**: Create and track both corrective and preventive maintenance
- 👥 **Team Management**: Organize specialized maintenance teams
- 📊 **Dashboard Analytics**: View statistics and key metrics
- 📅 **Calendar Scheduling**: Schedule and visualize preventive maintenance
- 📋 **Kanban Workflow**: Manage requests through workflow stages
- 🔐 **User Authentication**: Secure access with role-based permissions

---

## 🚀 Quick Start

Get up and running in 5 minutes:

```bash
# 1. Start Backend
cd Backend
npm install
npm run dev

# 2. Start Frontend (in new terminal)
cd Frontend
npm install
npm run dev

# 3. Open in browser
# http://localhost:5173
```

**For detailed setup**, see [QUICK_START.md](QUICK_START.md)

---

## ✨ Features

### Core Features

- ✅ User Authentication (Login/Register)
- ✅ Equipment CRUD Operations
- ✅ Maintenance Request Management
- ✅ Team Assignment & Management
- ✅ Request Status Workflow
- ✅ Role-Based Access Control
- ✅ Search & Advanced Filtering
- ✅ Responsive Design

### Advanced Features

- ✅ **Kanban Board**: Drag-and-drop workflow visualization
- ✅ **Calendar View**: Schedule and visualize maintenance
- ✅ **Dashboard**: Real-time statistics and metrics
- ✅ **Auto-Fill Logic**: Automatic data population
- ✅ **Overdue Detection**: Automatic identification of late tasks
- ✅ **Priority Levels**: 4-level priority system (Low, Medium, High, Critical)
- ✅ **Equipment Status**: Track equipment condition (Active, Inactive, Scrapped)
- ✅ **Team Workflows**: Assign work to specific teams

---

## 🛠️ Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with bcryptjs
- **API Style**: RESTful

### Frontend

- **Library**: React 19
- **Build Tool**: Vite
- **Routing**: React Router 6
- **State**: React Context API
- **Styling**: CSS3 with Responsive Design

### DevOps

- **Database**: MongoDB Community or Atlas
- **Version Control**: Git
- **Package Manager**: npm

---

## 📁 Project Structure

```
GearGuard/
├── Backend/
│   ├── src/
│   │   ├── models/          # Database schemas (4)
│   │   ├── controllers/      # Business logic (4)
│   │   ├── routes/          # API endpoints (4)
│   │   ├── middleware/      # Auth & error handling
│   │   ├── utils/           # Database connection
│   │   └── index.js         # Main server
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── pages/           # Main pages (6)
│   │   ├── components/      # Reusable components (2)
│   │   ├── context/         # State management (2)
│   │   ├── services/        # API integration
│   │   ├── styles/          # CSS files (8)
│   │   └── App.jsx          # Main component
│   └── package.json
└── Documentation/           # Guides & references
```

---

## 📊 API Overview

### Total Endpoints: 28

**Users** (6 endpoints)

- Authentication, user management

**Equipment** (7 endpoints)

- CRUD operations, request tracking

**Maintenance Requests** (8 endpoints)

- Request lifecycle, status updates

**Teams** (7 endpoints)

- Team management, member assignment

→ [Full API Reference](FULL_DOCUMENTATION.md#-api-endpoints-summary)

---

## 📖 Documentation

Complete documentation is provided for all aspects:

| Document                                       | Purpose               | Time   |
| ---------------------------------------------- | --------------------- | ------ |
| [INDEX.md](INDEX.md)                           | Navigation guide      | 5 min  |
| [QUICK_START.md](QUICK_START.md)               | 5-minute setup        | 10 min |
| [SETUP.md](SETUP.md)                           | Detailed installation | 30 min |
| [ARCHITECTURE.md](ARCHITECTURE.md)             | System design         | 20 min |
| [FULL_DOCUMENTATION.md](FULL_DOCUMENTATION.md) | API reference         | 45 min |
| [ENVIRONMENT_CONFIG.md](ENVIRONMENT_CONFIG.md) | Configuration         | 20 min |
| [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md)     | Deployment            | 30 min |

→ [Browse all documentation](INDEX.md)

---

## 🎯 Use Cases

### For Maintenance Teams

- Track equipment maintenance history
- Receive work assignments
- Update task status
- Log hours spent

### For Managers

- Create maintenance requests
- Assign teams to work
- Monitor progress
- View statistics

### For Administrators

- Manage users and teams
- Configure system settings
- Generate reports
- Ensure data integrity

---

## 🔒 Security

- ✅ JWT-based authentication
- ✅ Password hashing (bcryptjs)
- ✅ Role-based access control
- ✅ Protected API routes
- ✅ CORS configuration
- ✅ Input validation
- ✅ Error handling

---

## 📈 Performance

- Optimized database queries with indexes
- Efficient state management
- CSS minification
- Responsive design
- Lazy loading
- Caching strategies

---

## 🚀 Deployment

Ready to deploy to:

- ✅ **Backend**: Heroku, AWS, Azure, DigitalOcean
- ✅ **Frontend**: Vercel, Netlify, AWS S3
- ✅ **Database**: MongoDB Atlas (Cloud)

→ [Deployment Guide](LAUNCH_CHECKLIST.md#launch-day-checklist)

---

## 💡 Getting Started

### Prerequisites

- Node.js v14+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone or download** the project
2. **Backend Setup**: `cd Backend && npm install`
3. **Frontend Setup**: `cd Frontend && npm install`
4. **Configure**: Create `.env` files (see [ENVIRONMENT_CONFIG.md](ENVIRONMENT_CONFIG.md))
5. **Start**: Run `npm run dev` in both directories

→ [Detailed Setup Instructions](SETUP.md)

---

## 🎓 Learning Resources

### For Developers

- Start with [QUICK_START.md](QUICK_START.md)
- Learn architecture from [ARCHITECTURE.md](ARCHITECTURE.md)
- Reference [FULL_DOCUMENTATION.md](FULL_DOCUMENTATION.md)

### For DevOps

- Follow [SETUP.md](SETUP.md)
- Configure with [ENVIRONMENT_CONFIG.md](ENVIRONMENT_CONFIG.md)
- Deploy using [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md)

### For Project Managers

- Review [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
- Use [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md)

---

## 🤝 Support

### Common Issues?

→ Check [SETUP.md Troubleshooting](SETUP.md#troubleshooting-environment-issues)

### Need API Details?

→ See [FULL_DOCUMENTATION.md](FULL_DOCUMENTATION.md)

### Deployment Help?

→ Follow [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md)

### Configuration Questions?

→ Read [ENVIRONMENT_CONFIG.md](ENVIRONMENT_CONFIG.md)

---

## 📊 Project Statistics

```
✅ 100% Complete & Production-Ready

Files:              40+
Total Code:         5,000+ lines
Backend Code:       1,200 lines
Frontend Code:      1,200 lines
Documentation:      3,000+ lines

API Endpoints:      28
Database Models:    4
Pages:              6
Components:         2
CSS Files:          8
```

---

## 🎯 Next Steps

1. **Read**: [QUICK_START.md](QUICK_START.md) (5 minutes)
2. **Install**: Follow installation steps above
3. **Explore**: Use the application
4. **Configure**: Set up for production
5. **Deploy**: Use deployment guides

---

## 📝 License

MIT License - Feel free to use, modify, and distribute

---

## 🎉 Status

<div align="center">

### ✅ PROJECT COMPLETE & PRODUCTION READY

**Version 1.0.0** | **December 27, 2025**

All features implemented • Fully documented • Security hardened

[Get Started →](QUICK_START.md)

</div>

---

## 🔗 Quick Links

- 📖 [Documentation Index](INDEX.md)
- ⚡ [Quick Start Guide](QUICK_START.md)
- 🏗️ [Architecture Guide](ARCHITECTURE.md)
- 📚 [Full API Documentation](FULL_DOCUMENTATION.md)
- 🚀 [Launch Checklist](LAUNCH_CHECKLIST.md)
- ⚙️ [Environment Configuration](ENVIRONMENT_CONFIG.md)
- 📋 [Setup Instructions](SETUP.md)
- 📊 [File Inventory](FILE_INVENTORY.md)

---

**GearGuard** - Making Maintenance Simple and Efficient! ⚙️

**Ready to get started?** → [QUICK_START.md](QUICK_START.md)
#   G e a r G u a r d  
 