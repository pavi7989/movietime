const express = require('express');
const { addMovie, getAllMovies , updateMovie, deleteMovie } = require('../contollers/movieController'); // Import controller
const upload = require('../config/multer'); // ✅ Use your multer config

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: User authentication
 */

/**
 * @swagger
 * /movies/add:
 *   post:
 *     summary: Add a new movie
 *     tags: [Movies]
 *     description: Add movie details with image upload
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               rating:
 *                 type: number
 *               genres:
 *                 type: string
 *               trailer:
 *                 type: string
 *               wishlisted:
 *                 type: boolean
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Movie added successfully
 */

router.post('/add', upload.single('image'), addMovie); // ✅ Add multer middleware here

/**
 * @swagger
 * /movies/all:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: List of all movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *       500:
 *         description: S5erver error
 */
router.get('/all', getAllMovies);
// Update movie
/**
 * @swagger
 * /movies/update/{id}:
 *   put:
 *     summary: Update a movie
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The movie ID
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Optional - Movie name
 *               description:
 *                 type: string
 *                 description: Optional - Movie description
 *               rating:
 *                 type: number
 *                 description: Optional - Movie rating
 *               genres:
 *                 type: string
 *                 description: Optional - Comma-separated genres
 *               trailer:
 *                 type: string
 *                 description: Optional - Trailer URL
 *               wishlisted:
 *                 type: boolean
 *                 description: Optional - Wishlisted status
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Optional - Movie image file
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *       404:
 *         description: Movie not found
 */

router.put('/update/:id', upload.single('image'), updateMovie);

// Delete movie
/**
 * @swagger
 * /movies/delete/{id}:
 *   delete:
 *     summary: Delete a movie
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The movie ID
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       404:
 *         description: Movie not found
 */
router.delete('/delete/:id', deleteMovie);


module.exports = router;
