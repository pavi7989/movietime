const Profile = require("../models/Profile");
const multer = require("multer");
const path = require("path");

// Multer setup for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/profiles'); // make sure this folder exists
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + path.extname(file.originalname);
      cb(null, uniqueSuffix); // eg: 1744862404636.jpg
    }
  });
const upload = multer({ storage }).single("profileImage");

exports.createProfile = async (req, res) => {
    try {
        const { name, email, phone, address, bio } = req.body;
        const profileImage = req.file ? req.file.filename : null;

        if (!name || !email || !phone || !address || !bio) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const profile = await Profile.create({
            name,
            email,
            phone,
            address,
            bio,
            profileImage
        });

        res.status(201).json({ message: "Profile created successfully", profile });
    } catch (error) {
        console.error("Error creating profile:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


exports.getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.findAll();
        res.status(200).json({ message: "Profiles retrieved successfully", profiles });
    } catch (error) {
        console.error("Error fetching profiles:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getProfileById = async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await Profile.findByPk(id);

        if (!profile) return res.status(404).json({ error: "Profile not found" });

        res.status(200).json(profile);
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, address, bio } = req.body;

        const profile = await Profile.findByPk(id);
        if (!profile) return res.status(404).json({ error: "Profile not found" });

        const profileImage = req.file ? req.file.filename : profile.profileImage;

        await profile.update({ name, email, phone, address, bio, profileImage });
        res.status(200).json({ message: "Profile updated successfully", profile });

    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



const fs = require('fs');

exports.deleteProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await Profile.findByPk(id);
        if (!profile) return res.status(404).json({ error: "Profile not found" });

        // Delete the image file if exists
        if (profile.profileImage) {
            const imagePath = path.join(__dirname, "../uploads/profiles", profile.profileImage);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await profile.destroy();
        res.status(200).json({ message: "Profile deleted successfully" });
    } catch (error) {
        console.error("Error deleting profile:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
