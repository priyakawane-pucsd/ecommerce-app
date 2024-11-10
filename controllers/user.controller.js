const userService = require('../services/user.service');

// Admin: Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const result = await userService.deleteUser(req.params.id);

    // If the service returns a 404 or 400 status, handle those cases specifically
    if (result.status === 404) {
      return res.status(404).json({ error: result.message });
    }

    if (result.status === 400) {
      return res.status(400).json({ error: result.message });
    }

    // If the service returns a 200 status, return a success message
    if (result.status === 200) {
      return res.json({ message: result.message });
    }

    // Default to 500 if no specific status is returned
    return res.status(500).json({ error: result.message });

  } catch (err) {
    // Catch any unexpected errors and return a 500 status
    console.error(err);
    return res.status(500).json({ error: 'Failed to delete user' });
  }
};

// Admin: Update a user
exports.updateUser = async (req, res) => {
  try {
      const { id } = req.params;
      const { username, email, role } = req.body;

      const updatedUser = await userService.updateUser(id, { username, email, role });

      res.status(200).json(updatedUser);
  } catch (error) {
      res.status(error.statusCode || 500).json({
          message: error.message || 'Failed to update user',
      });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    // Get page and limit from query parameters, with defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    // Calculate the skip value for pagination
    const skip = (page - 1) * limit;

    const users = await userService.getAllUsers(page, limit, skip);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve users' });
  }
};