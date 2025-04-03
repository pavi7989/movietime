const User = require("../models/User")


exports.userRegister = async (req,res) => {
    
    try {
        // Check if the user already exists
        const { email, username, password, reEnterPassword } = req.body;
        if (!email || !username || !password || !reEnterPassword) {
            return res.status(400).json({ error: "All fields are required" });
        }
        if (password !== reEnterPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }
        const existingUser = await User.findOne({
          where: { email },
        });
    
        if (existingUser) {
          return res.status(400).json({ error: "Email is already taken" });
        }
    
        const newUser = await User.create({
          email,
          username,
          password,  
          reEnterPassword,
        });
    
        res.status(201).json({ message: "User registered successfully", user: newUser });
      } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal server error" });
     }
};

exports.getUsers = async (req, res) => {
  try {
      // Fetch all users from the database
      const users = await User.findAll(); // Assuming Sequelize ORM

      res.status(200).json({ message: "Users retrieved successfully", users });
  } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
      const { id } = req.params;
      const { email, username, password, reEnterPassword } = req.body;

      // Check if passwords match
      if (password !== reEnterPassword) {
          return res.status(400).json({ error: "Passwords do not match" });
      }

      // Find user by ID
      const user = await User.findByPk(id);
      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      // Update user details
      await user.update({ email, username, password, reEnterPassword });

      res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
      const { id } = req.params;

      // Find user by ID
      const user = await User.findByPk(id);
      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      // Delete user
      await user.destroy();

      res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};



