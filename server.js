// server.js
const express = require('express');
const connectDB = require("./config/db"); // Import database connection logic
const cookieParser = require('cookie-parser'); // Optional: if using cookies for authentication

// Import your routes
const eventRoutes = require('./Routes/events');  // Ensure this path is correct

// Initialize the Express app
const app = express();

// Connect to the database
connectDB(); // Call the function that connects to your database

// Middleware setup
app.use(express.json()); // For parsing application/json
app.use(cookieParser()); // Optional: for handling cookies

// Use the routes
app.use("/api/v1/events", eventRoutes); // The routes are now used under the "/api/v1/events" endpoint

// Set the port (use an environment variable if available)
const port = process.env.PORT || 5000; // Default to port 5000

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
