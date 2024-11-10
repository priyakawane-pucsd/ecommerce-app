const express = require('express');
const productController = require('../controllers/product.controller');
const { auth, adminAuth } = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management endpoints
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The product name
 *               description:
 *                 type: string
 *                 description: The product description
 *               price:
 *                 type: number
 *                 description: The product price
 *               visible:
 *                 type: boolean
 *                 description: Product visibility on the website
 *             example:
 *               name: "Sample Product"
 *               description: "This is a sample product"
 *               price: 99.99
 *               visible: true
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The product ID
 *                 name:
 *                   type: string
 *                   description: The product name
 *                 description:
 *                   type: string
 *                   description: The product description
 *                 price:
 *                   type: number
 *                   description: The product price
 *                 visible:
 *                   type: boolean
 *                   description: Product visibility on the website
 *       401:
 *         description: Unauthorized - user is not authenticated
 *       500:
 *         description: Server error - product creation failed
 */
router.post('/products', auth, productController.addProduct);

module.exports = router;
