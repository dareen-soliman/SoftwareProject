// server.js

const express = require('express');
const connectDB = require("./config/db"); // Import database connection logic
const cookieParser = require('cookie-parser'); // Optional: if using cookies for authentication
require('dotenv').config();
// Import your routes

const usersRoute = require('./Routes/users'); // Import your user routes
const bookingRoutes = require('./Routes/bookings'); 
const eventRoutes = require('./Routes/events'); 

// Initialize the Express app
const app = express();




// Middleware setup

app.use(express.json());
app.use(cookieParser());


connectDB(); // Call the function that connects to your database



///// Routes

app.use('/api/v1/users', usersRoute);
app.use('/api/v1/bookings', bookingRoutes);
app.use("/api/v1/events", eventRoutes); 





// Set the port (use an environment variable if available)
const port = process.env.PORT || 5000; // Default to port 5000

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
