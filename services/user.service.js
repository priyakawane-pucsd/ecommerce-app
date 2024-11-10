const userRepository = require('../repositories/user.repository');

// Delete a user (admin action)
const deleteUser = async (userId) => {
  try {
      // Fetch the user details by ID
      const userToDelete = await userRepository.getUserById(userId);
      if (!userToDelete) {
          return { status: 404, message: 'User not found' }; 
      }
      // Check if the user is an admin and if they are the only admin
      if (userToDelete.role === 'admin') {
          const adminCount = await userRepository.countAdmins();
          if (adminCount <= 1) {
              return { 
                  status: 400, 
                  message: 'There must be at least one admin. You cannot delete the only admin.' 
              };
          }
      }

      // Delete the user from the database
      const deletedUser = await userRepository.deleteUserById(userId);
      if (!deletedUser) {
          return { status: 500, message: 'Failed to delete user' }; 
      }

      return { 
          status: 200, 
          message: 'User deleted successfully' 
      }; 
  } catch (error) {
      console.error(error);
      return { 
          status: 500, 
          message: 'Internal server error' 
      };
  }
};

// Update a user (admin action)
const updateUser = async (id, userDetails) => {
  try {
      const { username, email, role } = userDetails;

      // Fetch the current user data
      const currentUser = await userRepository.getUserById(id);
      if (!currentUser) {
          return { status: 404, message: 'User not found' }; // Handle user not found
      }
      
      // Check if the current user is an admin and is trying to change to 'user'
      if (currentUser.role === 'admin' && role === 'user') {
        const adminCount = await userRepository.countAdmins();
        if (adminCount <= 1) {
            return { 
                status: 400, 
                message: 'There must be at least one admin. You cannot change the only admin to user.' 
            };
        }
      }

      // Check if the role is 'admin' and if an admin already exists
      if (role === 'admin') {
          const adminCount = await userRepository.countAdmins();
          if (adminCount >= 1) {
              return { 
                  status: 400, 
                  message: 'There can only be one admin. Please assign the role as user.' 
              };
          }
      }

      // Update the user in the database
      const updatedUser = await userRepository.updateUserById(id, { username, email, role });

      // Check if the user was found and updated
      if (!updatedUser) {
          return { status: 404, message: 'User not found' }; // Return proper error message
      }

      return { 
          status: 200, 
          message: 'User updated successfully', 
          data: updatedUser 
      }; 
  } catch (error) {
      if (error.statusCode) {
          throw { 
              status: error.statusCode, 
              message: error.message || 'An error occurred while updating the user.' 
          };
      } else {
          throw { 
              status: 500, 
              message: 'Internal server error' 
          };
      }
  }
};

/// Get all users with pagination
const getAllUsers = async (page, limit, skip) => {
  try {
    // Retrieve users based on skip and limit for pagination
    const users = await userRepository.getAllUsers(limit, skip);
    if (!users) {
      throw new Error('No users found');
    }
    // Count total users to calculate pagination details
    const totalUsers = await userRepository.countAllUsers();

    return {
      message: 'Users retrieved successfully',
      users,
      totalCount: totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    };
  } catch (error) {
    throw new Error('Error retrieving users: ' + error.message);
  }
};

// Find a user by username
const findUserByUsername = async (username) => {
    try {
      // Fetch the user by username
      const user = await userRepository.findUserByUsername(username);
  
      // If no user is found, return a 404 error
      if (!user) {
        return {
          status: 404,
          message: `User with username '${username}' not found`,
        };
      }
  
      return { 
        status: 200, 
        message: 'User found successfully', 
        data: user 
      };
  
    } catch (error) {
        if (error.statusCode) {
        throw { 
          status: error.statusCode, 
          message: error.message || 'An error occurred while finding the user by username.' 
        };
      } else {
        throw { 
          status: 500, 
          message: 'Internal server error while finding the user by username' 
        };
      }
    }
  };
  
  // Find a user by role
  const findUserByRole = async (role) => {
    try {
      // Fetch users by role
      const users = await userRepository.findUserByRole(role);
  
      // If no users are found, return a 404 error
      if (!users || users.length === 0) {
        return {
          status: 404,
          message: `No users found with role '${role}'`,
        };
      }
  
      return { 
        status: 200, 
        message: 'Users found successfully', 
        data: users 
      };
  
    } catch (error) {
      console.error(error);
        if (error.statusCode) {
        throw { 
          status: error.statusCode, 
          message: error.message || 'An error occurred while finding users by role.' 
        };
      } else {
        throw { 
          status: 500, 
          message: 'Internal server error while finding users by role' 
        };
      }
    }
  };
  
  // Create a new user
  const createUser = async (userData) => {
    try {
      // Create a new user in the repository
      const newUser = await userRepository.createUser(userData);
  
      if (!newUser) {
        return {
          status: 500,
          message: 'User creation failed',
        };
      }
  
      return { 
        status: 201, 
        message: 'User created successfully', 
        data: newUser 
      };
  
    } catch (error) {
      console.error(error);
        if (error.statusCode) {
        throw { 
          status: error.statusCode, 
          message: error.message || 'An error occurred while creating the user.' 
        };
      } else {
        throw { 
          status: 500, 
          message: 'Internal server error while creating the user' 
        };
      }
    }
};
  
module.exports = { 
  deleteUser, 
  updateUser, 
  findUserByUsername, 
  findUserByRole, 
  createUser,
  getAllUsers,
};
