const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/user.repository');

const signup = async (username, password, role) => {
  // Check if the user is trying to create an admin
  if (role === 'admin') {
    const adminExists = await userRepository.findUserByRole('admin');
    if (adminExists) {
      return { status: 400, message: 'There can be only one admin' };
    }
  }

  // Check if user already exists
  console.log(username,role);
  const existingUser = await userRepository.findUserByUsername( username );
  if (existingUser) {
    return { status: 400, message: 'User already exists' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  // Create a new user and return the user data
  const newUser = await userRepository.createUser({ username, password: hashedPassword, role });
  return { status: 201, message: 'User created successfully', user: newUser };
};

const login = async (username, password) => {
  const user = await userRepository.findUserByUsername(username);
  console.log('user####',user)
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = { signup, login };