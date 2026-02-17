# EcoLife API Documentation

## Base URL
`http://localhost:8000/api`

## Authentication
- **POST** `/auth/register` - Register new user
- **POST** `/auth/login` - User login

## Quiz Management
- **GET** `/quiz` - Get all quizzes
- **GET** `/quiz/:id` - Get quiz by ID
- **POST** `/quiz` - Create new quiz

## Animal Adoption
- **GET** `/animals` - Get available animals
- **GET** `/animals/:id` - Get animal by ID
- **POST** `/animals` - Add new animal

## User Management
- **GET** `/users/:id` - Get user profile
- **PUT** `/users/:id` - Update user profile
- **POST** `/users/:id/quiz-score` - Save quiz score

## Environmental Reports
- **GET** `/reports` - Get all reports
- **POST** `/reports` - Submit new report
- **PATCH** `/reports/:id/status` - Update report status

## Contact Forms
- **POST** `/contact` - Submit contact form
- **GET** `/contact` - Get all contacts (admin)
- **PATCH** `/contact/:id/status` - Update contact status

## Events
- **GET** `/events` - Get all events
- **POST** `/events` - Create new event
- **POST** `/events/:id/join` - Join event

## Request/Response Examples

### Submit Report
```json
POST /api/reports
{
  "type": "waste",
  "title": "Illegal dumping",
  "description": "Large waste dump near river",
  "location": {
    "address": "123 River St",
    "coordinates": { "lat": 40.7128, "lng": -74.0060 }
  }
}
```

### Contact Form
```json
POST /api/contact
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Volunteer Inquiry",
  "message": "I want to help with cleanup events",
  "type": "volunteer"
}
```