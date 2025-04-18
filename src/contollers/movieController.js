const Movie = require('../models/Movie'); // Import the Movie model
const path = require('path');

// Handle adding a new movie
exports.addMovie = async (req, res) => {
    try {
        const { name, description, rating, genres, trailer, wishlisted } = req.body;

        // Check if an image was uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'Image is required!' });
        }

        const imagePath = req.file.path; // ✅ Use path from uploaded file

        // Ensure that 'rating' is a number (float) and 'wishlisted' is a boolean
        const parsedRating = parseFloat(rating); // Convert rating to a float
        const parsedWishlisted = wishlisted === 'true' || wishlisted === true; // Handle boolean wishlisted field

        // Check if the rating is valid
        if (isNaN(parsedRating)) {
            return res.status(400).json({ error: 'Invalid rating value.' });
        }

        // Convert imagePath to a URL (assuming you're serving images from 'uploads' folder)
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/movies/${path.basename(imagePath)}`;

        // Create a new movie entry with the uploaded image
        const movie = await Movie.create({
            name,
            description,
            rating: parsedRating, // Store the parsed rating
            genres,
            trailer,
            wishlisted: parsedWishlisted, // Store the parsed wishlisted value
            imagePath: imageUrl // Save the image URL instead of just the file path
        });

        res.status(201).json({ message: 'Movie added successfully', movie });
    } catch (error) {
        console.error('❌ Error adding movie:', error.message);
        console.error(error.stack); // 👈 add this for better debugging
        res.status(500).json({ error: 'Server error' });
    }
};
// Get all movies
exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.findAll();
        res.status(200).json(movies);
    } catch (error) {
        console.error('❌ Error fetching movies:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
};

// Update a movie
exports.updateMovie = async (req, res) => {
    try {
        const movieId = req.params.id;
        const movie = await Movie.findByPk(movieId);

        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        // Extract fields
        const { name, description, rating, genres, trailer, wishlisted } = req.body;

        // Update only if values are provided
        if (name !== undefined) movie.name = name;
        if (description !== undefined) movie.description = description;
        if (rating !== undefined) movie.rating = parseFloat(rating);
        if (genres !== undefined) movie.genres = genres;
        if (trailer !== undefined) movie.trailer = trailer;
        if (wishlisted !== undefined) {
            movie.wishlisted = wishlisted === 'true' || wishlisted === true;
        }

        // If image is uploaded, update the image path
        if (req.file) {
            const imageUrl = `${req.protocol}://${req.get('host')}/uploads/movies/${path.basename(req.file.path)}`;
            movie.imagePath = imageUrl;
        }

        // Save updated movie
        await movie.save();

        res.status(200).json({ message: 'Movie updated successfully', movie });
    } catch (error) {
        console.error('❌ Error updating movie:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
};


// Delete a movie
exports.deleteMovie = async (req, res) => {
    try {
        const movieId = req.params.id;
        const movie = await Movie.findByPk(movieId);

        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        await movie.destroy();
        res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
        console.error('❌ Error deleting movie:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
};
