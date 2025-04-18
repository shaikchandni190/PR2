const User = require("../models/user");

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

// Add a new user
exports.addUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: "Error adding user" });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: "Error updating user" });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error deleting user" });
  }
};

// Get dashboard stats

exports.getDashboardStats = async (req, res) => {
  try {
    // Count total employees
    const totalEmployees = await User.countDocuments();

    // Count unique departments
    const departments = await User.distinct("department");
    const totalDepartments = departments.length;

    // Count unique projects
    const projects = await User.distinct("ongoingProject");
    const totalProjects = projects.length;

    res.status(200).json({
      totalEmployees,
      totalDepartments,
      totalProjects
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ error: "Error fetching dashboard stats" });
  }
};