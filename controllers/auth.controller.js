const authService = require('../services/auth.service');

exports.signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const result = await authService.signup(username, email, password, role);
    // Handle the response based on the result from the service
    return res.status(result.status).json({ message: result.message, user: result.user || null });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const result = await authService.login(req.body.username, req.body.password);
    if (result.status === 200) {
      return res.status(result.status).json({ message: result.message, token: result.token });
    } else {
      return res.status(result.status).json({ message: result.message });
    }
  } catch (err) {
    // Catch any other unexpected errors and respond with a 500 status
    console.error('Error during login:', err.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};