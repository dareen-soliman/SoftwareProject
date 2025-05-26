const express = require('express');
const cors = require('cors');  // <-- add this
const connectDB = require("./config/db");
const cookieParser = require('cookie-parser');
require('dotenv').config();

const loginRoute = require('./Routes/login');
const usersRoute = require('./Routes/users');
const bookingRoutes = require('./Routes/bookings');
const eventRoutes = require('./Routes/events');
const authenticationMiddleware = require('./Middleware/authenticationMiddleware');

const app = express();

// Add this before your routes and middleware:
app.use(cors({
  origin: 'http://localhost:5173',  // allow your frontend origin
  credentials: true,                 // if you use cookies/auth headers
}));

app.get('/', (req, res) => {
  res.send('Hello wow!');
});

app.use((req, res, next) => {
  if (req.method === 'GET') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

app.use(cookieParser());

connectDB();

// Public routes that don't require authentication
app.use('/api/v1', loginRoute);
app.use("/api/v1/events", eventRoutes); // Making events publicly accessible

// Protected routes that require authentication
app.use('/api/v1/users', authenticationMiddleware, usersRoute);
app.use('/api/v1/bookings', authenticationMiddleware, bookingRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
