const express = require("express");
const User = require("../models/User"); // Import User Model
const {getUsers}=require("../contollers/authController")
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     description: Creates a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input data
 */
router.post("/register", async (req, res) => {
    try {
        const { email, username, password, reEnterPassword } = req.body;

        if (!email || !username || !password || !reEnterPassword) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (password !== reEnterPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const user = await User.create({ email, username, password, reEnterPassword });

        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     description: Authenticate user and return a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized
 */
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await User.findOne({ where: { email } });

        if (!user || user.password !== password) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        res.status(200).json({ message: "Login successful", token: "sample-jwt-token" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

/**
 * @swagger
 * /auth/delete/{username}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Auth]
 *     description: Deletes a user account by email.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Email of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/delete/:username", async (req, res) => {
    try {
        console.log("Received DELETE request for:", req.params.username);

        const { username } = req.params;
        if (!username) {
            console.log("Error: No username provided");
            return res.status(400).json({ error: "Username is required" });
        }

        const user = await User.findOne({ where: { username } });

        if (!user) {
            console.log("User not found:", username);
            return res.status(404).json({ error: "User not found" });
        }

        await user.destroy();
        console.log("User deleted successfully:", username);
        res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: "Server error" });
    }
});


/**
 * @swagger
 * /auth/users:
 *   get:
 *     summary: Get all users
 *     tags: [Auth]
 *     description: Retrieve a list of all registered users.
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/User"
 */
router.get("/users", async (req, res) => {
    try {
        const users = await User.findAll(); // Fetch all users
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/**
 * @swagger
 * /auth/users/{id}:
 *   put:
 *     summary: Update user details
 *     description: Updates an existing user's information.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Doe
 *               email:
 *                 type: string
 *                 example: janedoe@example.com
 *               password:
 *                 type: string
 *                 example: "newpassword123"
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { email,username,  password, reEnterPassword} = req.body;

        // Find user by ID
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update user details
        await user.update({ email, username, password, reEnterPassword });

        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});


module.exports = router;
