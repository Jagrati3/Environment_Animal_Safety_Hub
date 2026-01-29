# EcoLife Incident Reporting Backend

## Overview

This is the backend API for the EcoLife Community Incident Reporting System. It provides RESTful endpoints for submitting and managing incident reports related to animal welfare and environmental hazards.

## Features

- **Report Submission**: Users can submit incident reports with detailed information
- **Report Tracking**: Track report status using report ID
- **Admin Dashboard**: Full CRUD operations for administrators
- **Statistics**: Real-time statistics and analytics
- **Filtering & Pagination**: Advanced filtering and pagination support

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **CORS**: Enabled for frontend integration

## Prerequisites

- Node.js >= 18.0.0
- MongoDB (local or Atlas)

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your MongoDB connection string

5. Start the server:
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/reports` | Submit a new incident report |
| GET | `/api/reports/:id/status` | Track report status by ID |

### Admin Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/reports` | Get all reports (with filtering) |
| GET | `/api/admin/reports/:id` | Get single report by ID |
| GET | `/api/admin/reports/statistics` | Get dashboard statistics |
| GET | `/api/admin/reports/urgent` | Get urgent/critical reports |
| PATCH | `/api/admin/reports/:id/status` | Update report status |
| POST | `/api/admin/reports/:id/notes` | Add admin note |
| DELETE | `/api/admin/reports/:id` | Delete a report |

## Request/Response Examples

### Submit Report

**Request:**
```json
POST /api/reports
{
  "incidentType": "cruelty",
  "reporter": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "(555) 123-4567",
    "contactPreference": "email"
  },
  "location": {
    "address": "123 Main St, City, State 12345",
    "date": "2024-01-15",
    "time": "14:30",
    "description": "Near the park entrance"
  },
  "animals": {
    "type": "dog",
    "count": 2,
    "description": "Two medium-sized brown dogs"
  },
  "incident": {
    "description": "Witnessed neglect of animals...",
    "urgency": "high",
    "ongoing": "yes",
    "additionalInfo": "Owner appears to be absent"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Report submitted successfully",
  "data": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "status": "pending",
    "createdAt": "2024-01-15T14:35:00.000Z"
  }
}
```

### Get Reports with Filters

**Request:**
```
GET /api/admin/reports?status=pending&urgency=high&page=1&limit=20
```

**Response:**
```json
{
  "success": true,
  "data": {
    "reports": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalReports": 100,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

### Update Report Status

**Request:**
```json
PATCH /api/admin/reports/:id/status
{
  "status": "in_progress",
  "note": "Assigned to field team for investigation",
  "adminName": "Admin User"
}
```

## Report Status Values

| Status | Description |
|--------|-------------|
| `pending` | New report awaiting review |
| `under_review` | Being reviewed by admin |
| `in_progress` | Active investigation |
| `resolved` | Issue has been resolved |
| `closed` | Case closed |
| `rejected` | Report rejected (invalid/duplicate) |

## Urgency Levels

| Level | Description |
|-------|-------------|
| `low` | Non-urgent, monitor situation |
| `medium` | Respond within hours |
| `high` | Immediate response needed |
| `critical` | Life-threatening emergency |

## Incident Types

- `cruelty` - Animal Cruelty
- `injury` - Injured Animal
- `stray` - Stray Animal
- `hoarding` - Animal Hoarding
- `illegal` - Illegal Activities
- `environment` - Environmental Hazard

## Error Handling

All errors follow this format:
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error 1", "Detailed error 2"]
}
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/ecolife_reports |

## License

MIT License - See LICENSE file for details
