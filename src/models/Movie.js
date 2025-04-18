const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../config/db'); // Import your database connection

// Define the Movie model
const Movie = sequelize.define('Movie', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    genres: {
        type: DataTypes.STRING, // Store genres as comma-separated values
        allowNull: false,
    },
    trailer: {
        type: DataTypes.STRING, // Store trailer URL
        allowNull: true,
    },
    wishlisted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    imagePath: {
        type: DataTypes.STRING, // Store the image path
        allowNull: false,
    }
}, {
    timestamps: true,
});

module.exports = Movie;
