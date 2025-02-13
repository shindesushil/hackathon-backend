const express = require("express");
const app = express();

const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Simple route
app.get("/", (req, res) => {
    res.send("Hello, Express!");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
