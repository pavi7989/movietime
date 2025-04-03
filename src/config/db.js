require("dotenv").config(); // Load environment variables

const { Sequelize } = require("sequelize");

// Create a Sequelize instance with MySQL connection using .env variables
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false, // Set to true if you want SQL query logs
  }
);

// Test the database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to MySQL successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to MySQL:", error);
  }
};

testConnection();

module.exports = sequelize;
