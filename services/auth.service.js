const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/user.repository');

const signup = async (username, email, password, role) => {
  // Check if the user is trying to create an admin
  if (role === 'admin') {
    const adminExists = await userRepository.findUserByRole('admin');
    if (adminExists) {
      return { status: 400, message: 'There can be only one admin' };
    }
  }

  // Check if user already exists
  const existingUser = await userRepository.findUserByUsername( username );
  if (existingUser) {
    return { status: 400, message: 'User already exists' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  // Create a new user and return the user data
  const newUser = await userRepository.createUser({ username, email, password: hashedPassword, role });
  return { status: 201, message: 'User created successfully', user: newUser };
};

const login = async (username, password) => {
  try {
    const user = await userRepository.findUserByUsername(username);
    if (!user) {
      return { status: 400, message: 'User does not exist' };
    }

    // Check if the provided password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { status: 400, message: 'Invalid credentials' };
    }
    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { status: 200, message: 'Login successful', token };
  } catch (error) {
    return { status: 500, message: 'Server error' };
  }
};

module.exports = { signup, login };