const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The unique username of the user.
 *         email:
 *           type: string
 *           description: The unique email address of the user.
 *         password:
 *           type: string
 *           description: The password for the user account.
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           default: user
 *           description: The role of the user, which can either be 'user' or 'admin'.
 *     Login:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user attempting to log in.
 *         password:
 *           type: string
 *           description: The password of the user attempting to log in.
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Sign up a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: User creation failed
 */
router.post('/signup', authController.signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in an existing user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */
router.post('/login', authController.login);

module.exports = router;
