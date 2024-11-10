const express = require('express');
const userController = require('../controllers/user.controller');
const { auth, adminAuth } = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * tags:
 *   - name: Users
 *     description: User management endpoints
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # This means the route requires a bearer token
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

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # This means the route requires a bearer token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The updated username
 *               email:
 *                 type: string
 *                 description: The updated email address
 *               role:
 *                 type: string
 *                 enum: [user]
 *                 description: The updated role of the user
 *             example:
 *               username: "new_username"
 *               email: "new_email@example.com"
 *               role: "user"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user ID
 *                 username:
 *                   type: string
 *                   description: The updated username
 *                 email:
 *                   type: string
 *                   description: The updated email address
 *                 role:
 *                   type: string
 *                   description: The updated role
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date the user was created
 *       401:
 *         description: Unauthorized - User is not authenticated
 *       403:
 *         description: Forbidden - Only admins can update users
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error - Failed to update user
 */
router.put('/users/:id', auth, adminAuth, userController.updateUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users with pagination (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # This means the route requires a bearer token
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         required: false
 *         description: Number of users per page
 *     responses:
 *       200:
 *         description: List of users with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages
 *                 currentPage:
 *                   type: integer
 *                   description: Current page number
 *                 totalCount:
 *                   type: integer
 *                   description: Total number of users
 *       401:
 *         description: Unauthorized - User is not authenticated
 *       403:
 *         description: Forbidden - Only admins can view users
 *       500:
 *         description: Server error - Failed to retrieve users
 */
router.get('/users', auth, adminAuth, userController.getAllUsers);

module.exports = router;
