const User = require('../models/user.model');

// Find user by username
const findUserByUsername = async (username) => User.findOne({ username });

// Find user by role
const findUserByRole = async (role) => User.findOne({ role });

// Create a new user
const createUser = async (userData) => new User(userData).save();

// Delete user by ID
const deleteUserById = async (userId) => User.findByIdAndDelete(userId);

// Update user by ID
const updateUserById = async (userId, updateData) => User.findByIdAndUpdate(userId, updateData, { new: true });

//Get count of admin role
const countAdmins = async () =>  User.countDocuments({ role: 'admin' });

// Find user by id
const getUserById = async (id) => User.findOne({ _id: id });

//Find all users
const getAllUsers = async (limit, skip) => User.find().select('-password -__v').skip(skip).limit(limit);

// Count all products (Admin access)
const countAllUsers = () => {
  return User.countDocuments();
};

module.exports = {
  findUserByUsername,
  findUserByRole,
  createUser,
  deleteUserById,
  updateUserById,
  countAdmins,
  getUserById,
  getAllUsers,
  countAllUsers,
};
