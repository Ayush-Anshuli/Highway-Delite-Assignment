# Highway Delite - User Schema

This is the server-side User schema for the Highway Delite application.

## User Model

### User Schema
- `name` (String, required): User's full name (2-50 characters)
- `dateOfBirth` (Date, required): User's date of birth
- `email` (String, required, unique): User's email address
- `createdAt` (Date): Account creation timestamp
- `updatedAt` (Date): Last update timestamp

## Database Setup

### Environment Variables

Create a `.env` file in the server directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/highway-delite
```

## Installation and Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env` file

3. Start the development server:
```bash
npm run dev
```

4. The server will run on `http://localhost:5000`

## Features

- **User Registration**: Basic user data storage
- **Email Validation**: Email format validation and uniqueness
- **Name Validation**: Length validation for user names
- **Timestamps**: Automatic creation and update timestamps
- **Database Indexing**: Optimized email queries

## File Structure

```
Assignment/server/
├── models/
│   ├── User.ts          # User schema
│   └── index.ts         # Model exports
├── config/
│   └── database.ts      # MongoDB connection
├── index.ts             # Main server file
└── README.md            # Documentation
``` 