# CRM Lead Management System

## Project Overview

This project is a full-stack CRM (Customer Relationship Management) Lead Management System developed for a small sales team.

The system allows users to:

- Manage sales leads
- Track lead progress through a sales pipeline
- Add internal notes
- Manage lead sources and statuses
- Manage assigned salespersons
- View dashboard statistics
- Search and filter leads
- Authenticate users securely using JWT

The application demonstrates frontend development, backend API development, authentication, database design, CRUD operations, validation, filtering, and dashboard reporting.

---

# Tech Stack Used

## Frontend

- React.js
- React Router DOM
- Tailwind CSS
- Axios
- React Hook Form
- React Toastify

## Backend

- Node.js
- Express.js
- JWT Authentication
- Express Validator

## Database

- MySQL
- Prisma ORM

---

# Features Implemented

## Authentication

- JWT-based login system
- Protected routes
- Token-based API authorization

### Test Credentials

```text
Email: admin@example.com
Password: password123

# Dashboard

Dashboard statistics include:

- Total Leads
- New Leads
- Qualified Leads
- Won Leads
- Lost Leads
- Total Estimated Deal Value
- Total Won Deal Value

---

# Lead Management

Users can:

- Create leads
- View leads
- Update leads
- Delete leads
- Update lead status
- View lead details

## Each lead contains:

- Lead Name
- Company Name
- Email
- Phone Number
- Lead Source
- Assigned Salesperson
- Status
- Estimated Deal Value
- Created Date
- Updated Date

---

# Lead Notes

Users can:

- Add notes to leads
- View notes
- Delete notes

## Each note includes:

- Note Content
- Created By
- Created Date

---

# Search and Filtering

Lead list supports:

- Search by lead name
- Search by company name
- Search by email
- Filter by lead status
- Filter by lead source
- Filter by salesperson

---

# Management Modules

Separate CRUD management pages for:

- Lead Sources
- Lead Statuses
- Salespersons

---

# How to Run Locally

## 1. Clone Repository

```bash
git clone https://github.com/MarioShehan22/CRM.git
```

---

## 2. Backend Setup

```bash
cd backend
npm install
```

---

## 3. Configure Environment Variables

Create `.env` file inside backend folder.

```env
DATABASE_URL="mysql://root:password@localhost:3306/crm_db"
JWT_SECRET=your_secret_key
PORT=5000
```

---

## 4. Prisma Setup

Generate Prisma Client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev
```

Seed database:

```bash
npx prisma db seed
```

---

## 5. Start Backend

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

## 6. Frontend Setup

```bash
cd frontend
npm install
```

---

## 7. Start Frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# Database Setup

## Database Used

- MySQL

## ORM

- Prisma ORM

## Main Entities

- User
- Lead
- LeadNote
- LeadSource
- LeadStatus
- Salesperson

---

# Environment Variables

## Backend `.env`

```env
DATABASE_URL="mysql://root:password@localhost:3306/crm_db"
JWT_SECRET=your_secret_key
PORT=5000
```

---

# API Features

## Authentication

- Login
- JWT Authorization

## Lead APIs

- Create Lead
- Get Leads
- Get Lead By ID
- Update Lead
- Delete Lead
- Update Lead Status

## Notes APIs

- Add Note
- Get Notes
- Delete Note

## Dashboard APIs

- Dashboard Statistics

---

# Form Validation

## Frontend validation implemented using:

- React Hook Form

## Backend validation implemented using:

- Express Validator

---

# Error Handling

Implemented:

- Backend validation errors
- Frontend validation messages
- Toast notifications
- API error handling
- Protected route handling

---

# Demo Video

Add your video link here.

Example:

```text
https://drive.google.com/drive/folders/1HmegPHZsWdZveiSiKgf9N0bKCVKWZQg7?usp=drive_link
```

---

# Reflection

This project helped improve my understanding of full-stack application development using React, Express, MySQL, and Prisma ORM.

## During development, I learned:

- JWT authentication flow
- Prisma ORM integration
- REST API development
- Form validation using React Hook Form
- Backend validation using Express Validator
- CRUD operations
- Dashboard aggregation queries
- Search and filtering functionality
- State management in React
- Error handling and debugging

One of the main challenges was implementing validation correctly between frontend and backend while keeping the user experience smooth.

I also improved my understanding of project structure, reusable components, and API integration in full-stack applications.

---

# Known Limitations

- No role-based authorization
- No pagination for leads
- No file upload support
- No email notification system
- No deployment yet

---

# Future Improvements

- Add role-based access control
- Add pagination
- Add activity logs
- Add email reminders
- Add charts and analytics
- Deploy application to cloud platforms
