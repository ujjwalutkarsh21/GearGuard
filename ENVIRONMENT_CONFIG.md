# Environment Configuration Guide

## Frontend Configuration

### Frontend/.env File

The frontend uses environment variables from Vite. Create a `.env` file in the Frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=GearGuard
VITE_APP_VERSION=1.0.0
```

**Note**: Vite requires variables to start with `VITE_` prefix.

### Using Environment Variables in Frontend

```javascript
// In your components
const API_URL = import.meta.env.VITE_API_URL;

// Or in services/api.js
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";
```

---

## Backend Configuration

### Backend/.env File (REQUIRED)

Create a `.env` file in the Backend directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/gearguard

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRATION=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Email Configuration (Optional - for future notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SENDER_EMAIL=noreply@gearguard.com
```

### Environment Variables Explained

#### Server

- `PORT`: Express server port (default: 5000)
- `NODE_ENV`: development, staging, or production

#### Database

- `MONGODB_URI`: MongoDB connection string
  - Local: `mongodb://localhost:27017/gearguard`
  - MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/gearguard`

#### Security

- `JWT_SECRET`: Secret key for signing JWT tokens (change in production!)
  - Generate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- `JWT_EXPIRATION`: Token expiration time (7d = 7 days)

#### CORS

- `CORS_ORIGIN`: Allowed origin for frontend requests

---

## Development vs Production Configuration

### Development

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gearguard
JWT_SECRET=dev_secret_key_123
```

### Production

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/gearguard
JWT_SECRET=your_super_secure_random_key_32_characters_long
CORS_ORIGIN=https://yourdomain.com
```

---

## MongoDB Setup

### Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/gearguard`

### MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/gearguard`
5. Add your IP address to network access
6. Update `.env` with connection string

### Verify MongoDB Connection

```bash
# Test with mongosh (MongoDB Shell)
mongosh "mongodb://localhost:27017/gearguard"

# Or with MongoDB Compass (GUI)
# - Download from mongodb.com/products/compass
# - Input connection string
# - View collections and data
```

---

## JWT Secret Generation

### Generate a Secure Secret

```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Output example:
# a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2

# Then use this value in .env:
# JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2
```

---

## Port Configuration

### Default Ports

- **Frontend**: 5173 (Vite default)
- **Backend**: 5000
- **MongoDB**: 27017

### Change Ports (if needed)

```env
# Backend/.env
PORT=3001

# Frontend vite.config.js
export default {
  server: {
    port: 3000
  }
}
```

---

## CORS Configuration

### Allow Specific Origins

```javascript
// Backend/src/index.js
const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://yourdomain.com",
    ],
    credentials: true,
  })
);
```

---

## Email Configuration (Optional)

For future email notification features:

```env
# Gmail Setup
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_specific_password

# To get Gmail app password:
# 1. Go to myaccount.google.com
# 2. Security → App passwords
# 3. Select Mail and Windows Computer
# 4. Copy the generated password
```

---

## Environment Variable Validation

### Example: Validating Required Variables

```javascript
// Backend/src/utils/env.js
const requiredEnvVars = ["MONGODB_URI", "JWT_SECRET", "PORT"];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

console.log("✅ All required environment variables configured");
```

---

## Secrets Management Best Practices

### ✅ DO's

- ✅ Use strong random secrets (32+ characters)
- ✅ Change secrets between environments
- ✅ Store secrets in `.env` (never in code)
- ✅ Add `.env` to `.gitignore`
- ✅ Use secret management tools in production
- ✅ Rotate secrets regularly

### ❌ DON'Ts

- ❌ Don't commit `.env` to Git
- ❌ Don't use simple secrets like "password123"
- ❌ Don't hardcode secrets in code
- ❌ Don't share `.env` files
- ❌ Don't use same secret in dev and production

---

## Production Deployment

### Heroku Deployment

```bash
# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_production_secret
heroku config:set MONGODB_URI=your_atlas_connection_string

# Verify
heroku config
```

### AWS Deployment

```bash
# Use AWS Systems Manager Parameter Store or Secrets Manager
# Or set environment variables in EC2/ECS configurations
```

### Docker Deployment

```dockerfile
# Dockerfile
ENV NODE_ENV=production
ENV PORT=5000

# Use docker-compose.yml for secrets
```

---

## Troubleshooting Environment Issues

### Issue: "Cannot find module" after changing .env

**Solution**: Restart the server

```bash
npm run dev
```

### Issue: MongoDB Connection Error

**Solution**: Check MONGODB_URI

```bash
# Verify connection
mongosh "your_connection_string"
```

### Issue: JWT Token Invalid

**Solution**: Ensure JWT_SECRET is same across all instances

```bash
# Check .env
echo $JWT_SECRET
```

### Issue: CORS Errors

**Solution**: Verify CORS_ORIGIN matches frontend URL

```env
CORS_ORIGIN=http://localhost:5173
```

---

## Environment Checklist

### Pre-Development

- [ ] Node.js v14+ installed
- [ ] npm or yarn installed
- [ ] MongoDB installed or Atlas account
- [ ] `.env` files created in Backend and Frontend
- [ ] All required variables configured
- [ ] MongoDB connection verified
- [ ] Backend starts successfully
- [ ] Frontend starts successfully

### Pre-Deployment

- [ ] `NODE_ENV=production`
- [ ] Strong `JWT_SECRET` generated
- [ ] Production MongoDB URI configured
- [ ] CORS origin updated
- [ ] Error logging configured
- [ ] Backup plan for data
- [ ] SSL/HTTPS enabled
- [ ] Secrets never committed to Git

---

## Sample .env Files

### Backend/.env (Development)

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/gearguard
JWT_SECRET=dev_secret_for_testing_only
CORS_ORIGIN=http://localhost:5173
```

### Backend/.env (Production)

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/gearguard
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2
CORS_ORIGIN=https://app.gearguard.com
```

### Frontend/.env (Development)

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=GearGuard
VITE_APP_VERSION=1.0.0
```

### Frontend/.env (Production)

```env
VITE_API_URL=https://api.gearguard.com/api
VITE_APP_NAME=GearGuard
VITE_APP_VERSION=1.0.0
```

---

## Quick Reference

| Variable    | Type   | Example                             | Required |
| ----------- | ------ | ----------------------------------- | -------- |
| MONGODB_URI | String | mongodb://localhost:27017/gearguard | Yes      |
| JWT_SECRET  | String | random_32_char_string               | Yes      |
| PORT        | Number | 5000                                | No       |
| NODE_ENV    | String | development/production              | No       |
| CORS_ORIGIN | String | http://localhost:5173               | No       |

---

**Configuration Last Updated**: December 27, 2025

Remember: **Never commit `.env` files to version control!**
