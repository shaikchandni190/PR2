const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Existing routes
router.get("/users", userController.getUsers);
router.post("/addUser", userController.addUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);
router.get("/dashboard-stats", userController.getDashboardStats);


module.exports = router;