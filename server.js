const express = require("express");
const sequelize = require("./src/config/db"); // Import database
const User = require("./src/models/User"); // Ensure models are loaded
const authRoutes = require("./src/routes/authRoutes");
const setupSwagger = require("./src/config/swagger");
require("dotenv").config();

const app = express();
app.use(express.json());

// ✅ Setup Swagger API Docs
setupSwagger(app);

// ✅ Register Routes
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Hello");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    try {
        await sequelize.sync({ alter: true }); // ✅ Ensure tables are created
        console.log(`✅ Server running on http://localhost:${PORT}`);
    } catch (error) {
        console.error("❌ Error syncing database:", error);
    }
});