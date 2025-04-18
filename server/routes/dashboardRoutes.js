const express = require("express");
const User = require("../models/users"); // Ensure you have a User model
const router = express.Router();

router.get("/dashboard-stats", async (req, res) => {
  try {
    const totalEmployees = await User.countDocuments();
    const totalDepartments = await User.distinct("department").then((depts) => depts.length);
    const totalProjects = await User.distinct("ongoingProject").then((projects) => projects.length);

    res.json({ totalEmployees, totalDepartments, totalProjects });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
