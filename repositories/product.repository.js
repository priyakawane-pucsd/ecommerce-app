const Product = require('../models/product.model');

// Create a new product
const createProduct = async (productData) => new Product(productData).save();

// Find all approved products
const findApprovedProducts = async (limit, skip) => Product.find({ isApproved: true }).populate('addedBy', 'username').skip(skip).limit(limit);

// Find product by ID
const findProductById = async (productId) => Product.findById(productId);

// Delete product by ID
const deleteProductById = async (productId) => Product.findByIdAndDelete(productId);

// Update product by ID
const updateProductById = async (productId, updateData) => Product.findByIdAndUpdate(productId, updateData, { new: true });

// Find all approved products
const getAllProducts = async (limit, skip) => Product.find({}).skip(skip).limit(limit).populate('addedBy', 'username');

// Count the number of approved products
const countApprovedProducts = () => {
  return Product.countDocuments({ isApproved: true });
};

// Count all products (Admin access)
const countAllProducts = () => {
  return Product.countDocuments();
};

module.exports = {
  createProduct,
  findApprovedProducts,
  findProductById,
  deleteProductById,
  updateProductById,
  getAllProducts,
  countApprovedProducts,
  countAllProducts,
};
