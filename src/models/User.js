const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Import the database connection

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Email validation
    },
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reEnterPassword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

// Sync model with database
(async () => {
  await sequelize.sync(); // Creates the table if it doesn't exist
  console.log("✅ User model synced successfully.");
})();

module.exports = User;
