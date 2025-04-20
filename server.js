// server.js

const express = require('express');
const connectDB = require("./config/db"); // Import database connection logic
const cookieParser = require('cookie-parser'); // Optional: if using cookies for authentication
require('dotenv').config();



// Import your routes

const loginRoute = require('./Routes/login'); // Import your login routes
const usersRoute = require('./Routes/users'); // Import your user routes
const bookingRoutes = require('./Routes/bookings'); 
const eventRoutes = require('./Routes/events'); 
const authenticationMiddleware = require('./Middleware/authenticationMiddleware');

// Initialize the Express app
const app = express();


app.get('/', (req, res) => {
  res.send('Hello wow!'); // Test route
});

// Middleware setup

app.use((req, res, next) => {
  if (req.method === 'GET') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

app.use(cookieParser());



connectDB(); // Call the function that connects to your database


app.use('/api/v1', loginRoute); // Use the user routes
///// Routes

app.use(authenticationMiddleware);

app.use('/api/v1/users', usersRoute);
app.use('/api/v1/bookings', bookingRoutes);
app.use("/api/v1/events", eventRoutes); 





// Set the port (use an environment variable if available)
const port = process.env.PORT || 3000; // Default to port 5000

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
