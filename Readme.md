# GearGuard - The Ultimate Maintenance Tracker

A comprehensive maintenance management system for tracking assets, managing maintenance requests, and coordinating repair teams.

## 📋 Project Structure

```
GearGuard/
├── Backend/              # Express.js API
│   ├── src/
│   │   ├── models/      # MongoDB schemas
│   │   ├── controllers/ # Business logic
│   │   ├── routes/      # API endpoints
│   │   ├── middleware/  # Auth & error handling
│   │   └── utils/       # Database & helpers
│   └── package.json
├── Frontend/             # React + Vite
│   ├── src/
│   │   ├── pages/       # Main pages
│   │   ├── components/  # Reusable components
│   │   ├── services/    # API calls
│   │   ├── context/     # State management
│   │   ├── styles/      # CSS files
│   │   └── layouts/     # Layout components
│   └── package.json
└── README.md
```

## 🚀 Features

### Core Modules

#### 1. **Equipment Tracking**

- Manage company assets (machines, computers, printers, etc.)
- Track ownership and physical location
- Record purchase date and warranty information
- Assign equipment to maintenance teams and technicians
- Filter by department, category, or employee
- View maintenance history for each asset

#### 2. **Maintenance Team Management**

- Define specialized teams (Mechanics, Electricians, IT Support)
- Manage team members and technicians
- Assign teams to equipment
- Track team workload and assignments

#### 3. **Maintenance Requests**

- **Corrective**: Unplanned repairs (breakdowns)
- **Preventive**: Planned maintenance (routine checkups)
- Track request lifecycle (New → In Progress → Repaired → Scrap)
- Set priority levels (Low, Medium, High, Critical)
- Record hours spent and completion status
- Automatic overdue detection

### Views & Features

#### **Dashboard**

- Overview of total, open, completed, and overdue requests
- Recent request list
- Team information
- Key statistics and metrics

#### **Kanban Board**

- Visual workflow management
- Drag-and-drop request movement between stages
- Stage grouping: New, In Progress, Repaired, Scrap
- Visual overdue indicators
- Priority color coding

#### **Calendar View**

- Monthly calendar display
- Preventive maintenance scheduling
- Click to create new request
- Visual request indicators on dates

#### **Equipment Tracking**

- Searchable equipment database
- Filter by department, category, location
- View detailed equipment information
- Create maintenance requests from equipment page
- Smart maintenance button with open request count

#### **Smart Features**

- **Auto-Fill Logic**: Equipment category and team auto-populate
- **Scrap Logic**: When moved to Scrap, equipment marked as unusable
- **Overdue Detection**: Automatic identification of late requests
- **Status Color Coding**: Visual priority indicators
- **Team Workflow**: Automatic assignment and status updates

## 🛠️ Technology Stack

### Backend

- **Node.js** + **Express.js** - REST API
- **MongoDB** - NoSQL Database
- **Mongoose** - ODM
- **bcryptjs** - Password hashing
- **jwt-simple** - Authentication tokens
- **CORS** - Cross-Origin Resource Sharing

### Frontend

- **React 19** - UI library
- **Vite** - Build tool
- **React Router 6** - Navigation
- **Context API** - State management
- **CSS3** - Styling

## 📦 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

```bash
cd Backend
npm install
```

Create `.env` file:

```
MONGODB_URI=mongodb://localhost:27017/gearguard
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here_change_in_production
```

Start development server:

```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🔌 API Endpoints

### Equipment

- `GET /api/equipment` - List all equipment
- `POST /api/equipment` - Create new equipment
- `GET /api/equipment/:id` - Get equipment details
- `PUT /api/equipment/:id` - Update equipment
- `DELETE /api/equipment/:id` - Delete equipment
- `GET /api/equipment/:id/requests` - Get equipment's requests

### Maintenance Requests

- `GET /api/maintenance-requests` - List requests (with filters)
- `POST /api/maintenance-requests` - Create request
- `GET /api/maintenance-requests/:id` - Get request details
- `PUT /api/maintenance-requests/:id` - Update request
- `PATCH /api/maintenance-requests/:id/assign` - Assign to technician
- `PATCH /api/maintenance-requests/:id/complete` - Mark complete
- `PATCH /api/maintenance-requests/:id/scrap` - Mark as scrap
- `DELETE /api/maintenance-requests/:id` - Delete request

### Teams

- `GET /api/teams` - List all teams
- `POST /api/teams` - Create team
- `GET /api/teams/:id` - Get team details
- `PUT /api/teams/:id` - Update team
- `PATCH /api/teams/:id/add-member` - Add member
- `PATCH /api/teams/:id/remove-member` - Remove member
- `DELETE /api/teams/:id` - Delete team

### Users

- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users` - List users
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## 🔐 Authentication

- JWT-based authentication
- User roles: Technician, Manager, Admin
- Token stored in localStorage
- Protected routes and API endpoints

## 📊 Database Models

### Equipment

```javascript
{
  name,
    serialNumber,
    category,
    department,
    assignedEmployee,
    purchaseDate,
    warrantyExpiration,
    location,
    status,
    maintenanceTeam,
    assignedTechnician;
}
```

### MaintenanceRequest

```javascript
{
  subject,
    type,
    equipment,
    category,
    status,
    scheduledDate,
    dueDate,
    assignedTeam,
    assignedTechnician,
    duration,
    hoursSpent,
    priority,
    description,
    notes,
    isOverdue,
    createdBy;
}
```

### MaintenanceTeam

```javascript
{
  name, description, members;
}
```

### User

```javascript
{
  username,
    email,
    password,
    fullName,
    role,
    team,
    department,
    profileImage,
    isActive;
}
```

## 🎨 UI/UX Design

- Modern gradient design with primary colors (#667eea, #764ba2)
- Responsive grid layouts
- Smooth transitions and hover effects
- Status color coding for quick identification
- Mobile-friendly design
- Accessibility-focused components

## 🔄 Workflow Examples

### Corrective Maintenance Flow

1. Equipment breaks down
2. Technician creates request with "Corrective" type
3. Auto-filled with equipment details
4. Manager/Technician assigns to team
5. Technician updates status to "In Progress"
6. Work is completed, status → "Repaired"
7. Hours spent recorded

### Preventive Maintenance Flow

1. Manager creates request with "Preventive" type
2. Sets scheduled date (appears on calendar)
3. System notifies assigned team
4. Team performs maintenance
5. Completion recorded with notes
6. Automatic scheduling logic triggers next check

## 📈 Reports & Analytics

- Request count by status
- Request count by type
- Overdue request tracking
- Team workload analysis
- Equipment maintenance history
- Completion rate metrics

## 🚀 Future Enhancements

- Real-time notifications
- Mobile app
- Advanced reporting and dashboards
- Part inventory management
- Cost tracking
- File attachments for requests
- Email notifications
- Custom workflow rules
- Multi-language support

## 📝 License

MIT License - Feel free to use this project

## 👥 Contributing

Contributions are welcome! Please follow the project structure and coding standards.

## 💬 Support

For issues or questions, please create an issue in the repository.

---

**GearGuard** - Making Maintenance Simple and Efficient! ⚙️
