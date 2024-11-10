const authService = require('../services/auth.service');

exports.signup = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const result = await authService.signup(username, password, role);
    // Handle the response based on the result from the service
    return res.status(result.status).json({ message: result.message, user: result.user || null });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await authService.login(req.body.username, req.body.password);
    console.log('token******',token)
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: 'Login failed' });
  }
};