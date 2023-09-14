// Import the required mongoose library for MongoDB interactions
const mongoose = require('mongoose');

// Load environment variables from a .env file (dotenv package)
require('dotenv').config();

// Retrieve the MongoDB connection URI from environment variables
const mongoURI = process.env.MONGODB_URI;

// Function to connect to the MongoDB database
const connectDB = async () => {
    try {
        // Use the mongoose.connect() method to connect to MongoDB using the provided URI
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,         // Use the new URL parser
            useUnifiedTopology: true,     // Use the new Server Discovery and Monitoring engine
        });

        // Log a success message when the database connection is established
        console.log("Database connected!!");

    } catch (error) {
        // If an error occurs during the database connection, log the error and exit the process
        console.error("Error connecting to the database:", error);
        process.exit(1); // Exit the Node.js process with an error code (1)
    }
}

// Export the connectDB function for use in other parts of your application
module.exports = connectDB;
