const express = require("express");
const upload = require("../middleware/profileMiddleware"); 
const { createProfile, getProfiles, updateProfile, deleteProfile } = require("../contollers/profileController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Profiles
 *   description: Profile management
 */

/**
 * @swagger
 * /userprofile/create:
 *   post:
 *     summary: Create a new profile
 *     tags: [Profiles]
 *     description: Creates a new user profile with an image upload.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *               address:
 *                 type: string
 *                 example: "123 Main St, NY"
 *               bio:
 *                 type: string
 *                 example: "A passionate movie enthusiast"
 *               profileImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Profile created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/create", upload.single("profileImage"), createProfile);

/**
 * @swagger
 * /userprofile/profile/{id}:
 *   get:
 *     summary: Get a profile by ID
 *     tags: [Profiles]
 *     description: Fetches a user profile by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the profile to retrieve
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Internal server error
 */

router.get("/profiles", getProfiles);

/**
 * @swagger
 * /userprofile/profile/{id}:
 *   put:
 *     summary: Update an existing profile
 *     tags: [Profiles]
 *     description: Updates a profile by ID, including image upload.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the profile to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               bio:
 *                 type: string
 *               profileImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Internal server error
 */
router.put("/profile/:id", upload.single("profileImage"), updateProfile);

/**
 * @swagger
 * /userprofile/profile/{id}:
 *   delete:
 *     summary: Delete a profile
 *     tags: [Profiles]
 *     description: Deletes a profile by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the profile to delete
 *     responses:
 *       200:
 *         description: Profile deleted successfully
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Internal server error
 */
router.delete("/profile/:id", deleteProfile);

module.exports = router;