const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Import your database connection

const Profile = sequelize.define('Profile', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    profileImage: {
        type: DataTypes.STRING, // Stores the file path of the uploaded image
        allowNull: true
    }
}, {
    tableName: 'profiles', // Name of the database table
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = Profile;