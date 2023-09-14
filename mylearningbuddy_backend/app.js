// Import necessary modules
const express = require("express");
const app = express();
const connectDB = require('./db'); // Import the function to connect to the database
const cors = require("cors");

// Middleware for parsing JSON and URL-encoded data
app.use(express.json()); // for parsing JSON data
app.use(express.urlencoded({ extended: true })); // for parsing URL-encoded data

const PORT = 5000; // Define the port for your application

// Connect to the database
connectDB();

// Enable CORS for requests from http://localhost:3000
app.use(cors({ origin: "http://localhost:3000" }));

// Define a simple route for the root URL
app.get("/", (req, res) => {
    res.send('Your app is added with a backend now');
})

// Use various routes for your API
app.use("/api", require("./Routes/Createuser"));
app.use("/api", require("./Routes/Authuser"));
app.use("/api", require("./Routes/AddNotebook"));
app.use("/api", require("./Routes/DeleteNotebook"));
app.use("/api", require("./Routes/Addchapter"));
app.use("/api", require("./Routes/DeleteChapter"));
app.use("/api", require("./Routes/AddContents"));
app.use("/api", require("./Routes/DeleteContents"));
app.use("/api", require("./Routes/AddQuickNotes"));

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log("App is listening at", PORT);
})


// Middleware: Express middleware is used to handle JSON and URL-encoded data, which allows your application to parse and work with different types of data sent in requests.
