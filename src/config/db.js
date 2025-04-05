require("dotenv").config(); // Load environment variables

const { Sequelize } = require("sequelize");

// Create a Sequelize instance with MySQL connection using .env variables
const sequelize = new Sequelize("mysql://root:rKxEQFcUQmMGJnnLnGBigKFbKVrOfPRK@ballast.proxy.rlwy.net:55245/railway");

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
