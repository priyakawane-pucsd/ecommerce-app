const User = require('../models/user.model')
console.log('User>>>>>',User)
const findUserByUsername = async (username) => User.findOne({ username });
const findUserByRole = async (role) => User.findOne({ role });
const createUser = async (userData) => new User(userData).save();
const deleteUserById = async (userId) => User.findByIdAndDelete(userId);

module.exports = {
  findUserByUsername,
  findUserByRole,
  createUser,
  deleteUserById,
};