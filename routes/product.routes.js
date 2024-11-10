const express = require('express');
const productController = require('../controllers/product.controller');
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
 *       - bearerAuth: []  # This means the route requires a bearer token
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
 *             example:
 *               name: "Sample Product"
 *               description: "This is a sample product"
 *               price: 99.99
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
 *       400:
 *         description: Bad Request - Invalid product data
 *       401:
 *         description: Unauthorized - User is not authenticated
 *       500:
 *         description: Server error - Product creation failed
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get a list of approved products with pagination
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number (for pagination)
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of products per page
 *     responses:
 *       200:
 *         description: List of approved products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The product ID
 *                       name:
 *                         type: string
 *                         description: The product name
 *                       description:
 *                         type: string
 *                         description: The product description
 *                       price:
 *                         type: number
 *                         description: The product price
 *                       isApproved:
 *                         type: boolean
 *                         description: Product approval status
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages
 *                 currentPage:
 *                   type: integer
 *                   description: Current page number
 *                 totalProducts:
 *                   type: integer
 *                   description: Total number of products
 *       500:
 *         description: Server error - Failed to retrieve products
 */

/**
 * @swagger
 * /products/{id}/approve:
 *   patch:
 *     summary: Approve a product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []  # This means the route requires a bearer token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID to approve
 *     responses:
 *       200:
 *         description: Product approved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product approved"
 *       401:
 *         description: Unauthorized - User is not authenticated
 *       403:
 *         description: Forbidden - Only admins can approve products
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error - Failed to approve product
 */

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []  # This means the route requires a bearer token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product deleted"
 *       401:
 *         description: Unauthorized - User is not authenticated
 *       403:
 *         description: Forbidden - Only admins can delete products
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error - Failed to delete product
 */

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []  # This means the route requires a bearer token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated product name
 *               description:
 *                 type: string
 *                 description: The updated product description
 *               price:
 *                 type: number
 *                 description: The updated product price
 *             example:
 *               name: "Updated Product"
 *               description: "This is an updated product"
 *               price: 129.99
 *               isApproved: true
 *     responses:
 *       200:
 *         description: Product updated successfully
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
 *                   description: The updated product name
 *                 description:
 *                   type: string
 *                   description: The updated product description
 *                 price:
 *                   type: number
 *                   description: The updated product price
 *                 isApproved:
 *                   type: boolean
 *                   description: Product approval status
 *       401:
 *         description: Unauthorized - User is not authenticated
 *       403:
 *         description: Forbidden - Only admins can update products
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error - Failed to update product
 */

/**
 * @swagger
 * /products/all:
 *   get:
 *     summary: Get all products with pagination (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []  # This means the route requires a bearer token
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number (for pagination)
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of products per page
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The product ID
 *                       name:
 *                         type: string
 *                         description: The product name
 *                       description:
 *                         type: string
 *                         description: The product description
 *                       price:
 *                         type: number
 *                         description: The product price
 *                       isApproved:
 *                         type: boolean
 *                         description: Product approval status
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages
 *                 currentPage:
 *                   type: integer
 *                   description: Current page number
 *                 totalProducts:
 *                   type: integer
 *                   description: Total number of products
 *       401:
 *         description: Unauthorized - User is not authenticated
 *       403:
 *         description: Forbidden - Only admins can view all products
 *       500:
 *         description: Server error - Failed to retrieve products
 */

router.post('/products', auth, productController.addProduct); // This route requires the user to be authenticated
router.get('/products', productController.getApprovedProducts); // This route is open to everyone, no authentication required
router.patch('/products/:id/approve', auth, adminAuth, productController.approveProduct); // Only admins can approve
router.delete('/products/:id', auth, adminAuth, productController.deleteProduct); // Only admins can delete
router.put('/products/:id', auth, adminAuth, productController.updateProduct); // Only admins can update
router.get('/products/all', auth, adminAuth, productController.getAllProducts); // Only admins can access

module.exports = router;
