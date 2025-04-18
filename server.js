const express = require("express");
const sequelize = require("./src/config/db"); // Import database connection
const User = require("./src/models/User"); // Ensure User model is loaded
const Movie = require("./src/models/Movie"); // Ensure Movie model is loaded
const authRoutes = require("./src/routes/authRoutes"); // Import authentication routes
const movieRoutes = require("./src/routes/movieRoutes"); // Import movie routes
const setupSwagger = require("./src/config/swagger"); // Setup Swagger for API Docs
const profileRoutes= require("./src/routes/profileRoutes");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());

// ✅ Serve image folder publicly (added)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Setup Swagger API Docs
setupSwagger(app);

// ✅ Register Routes
app.use("/auth", authRoutes); // Authentication routes
app.use("/movies", movieRoutes); // Movie routes

app.use("/userprofile", profileRoutes);

// Root route for testing
app.get("/", (req, res) => {
    res.send("Hello, welcome to the Movie API!");
});

// ✅ Sync DB and start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    try {
        await sequelize.sync({ alter: true }); // ✅ Ensure tables are created
        console.log(`✅ Server running on https://localhost:${PORT}`);
    } catch (error) {
        console.error("❌ Error syncing database:", error);
    }
});