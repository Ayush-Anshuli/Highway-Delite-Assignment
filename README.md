# Highway Delite

A full-stack application with React frontend and Node.js backend with MongoDB database.

## Project Structure

```
Assignment/
├── client/          # React frontend
├── server/          # Node.js backend
│   ├── config/      # Database configuration
│   ├── controllers/ # Route controllers
│   ├── models/      # MongoDB models
│   ├── routes/      # API routes
│   └── utils/       # Utility functions
└── package.json     # Backend dependencies
```

## Setup Instructions

### Backend Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with your MongoDB credentials:
   ```
   MONGODB_URI=mongodb+srv://ayush:<your_actual_password>@cluster0.tq1tkp1.mongodb.net/
   PORT=5000
   NODE_ENV=development
   ```

3. Replace `<your_actual_password>` with your actual MongoDB password.

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

### Backend
- `npm run dev` - Start development server with nodemon
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production

## Database Connection

The application is configured to connect to MongoDB Atlas using the provided connection string:
`mongodb+srv://ayush:<db_password>@cluster0.tq1tkp1.mongodb.net/`

Make sure to:
1. Replace `<db_password>` with your actual password
2. Ensure your IP address is whitelisted in MongoDB Atlas
3. Check that the database user has the necessary permissions 