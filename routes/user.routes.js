const express = require('express');
const userController = require('../controllers/user.controller');
const { auth, adminAuth } = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted"
 *       401:
 *         description: Unauthorized - User is not authenticated
 *       403:
 *         description: Forbidden - Only admins can delete users
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error - Failed to delete user
 */
router.delete('/users/:id', auth, adminAuth, userController.deleteUser);

module.exports = router;
