const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  salary: { type: Number, required: true },
  department: { type: String, required: true },
  ongoingProject: { type: String, required: true }
});

module.exports = mongoose.model("User", userSchema);
