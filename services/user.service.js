const userRepository = require('../repositories/user.repository');

const deleteUser = async (userId) => userRepository.deleteUserById(userId);

module.exports = { deleteUser };