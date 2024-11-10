const productService = require('../services/product.service');

// User: Add a new product
exports.addProduct = async (req, res) => {
  try {
    const product = await productService.addProduct({ ...req.body, addedBy: req.user.id });
    return res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    return res.status(500).json({ message: 'Error adding product' });
  }
};

// Get approved products for display
exports.getApprovedProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await productService.getApprovedProducts(page, limit, skip);
    return res.status(200).json({ message: 'Products retrieved successfully', products });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving products' });
  }
};

// Admin: Approve a product
exports.approveProduct = async (req, res) => {
  try {
    const product = await productService.approveProduct(req.params.id);
    return res.status(200).json({ message: 'Product approved', product });
  } catch (error) {
    return res.status(500).json({ message: 'Error approving product' });
  }
};

// Admin: Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting product' });
  }
};

// Admin: Update a product
exports.updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    return res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating product' });
  }
};

// Admin: Get all product
exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const products = await productService.getAllProducts(page, limit, skip);
    return res.status(200).json({ message: 'Products retrieved successfully', products });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving products' });
  }
};
