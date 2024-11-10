const Product = require('../models/product.model');

const createProduct = async (productData) => new Product(productData).save();
const updateProductById = async (productId, updateData) => Product.findByIdAndUpdate(productId, updateData, { new: true });
const deleteProductById = async (productId) => Product.findByIdAndDelete(productId);
const toggleProductVisibility = async (productId) => {
  const product = await Product.findById(productId);
  product.visible = !product.visible;
  return product.save();
};

module.exports = {
  createProduct,
  updateProductById,
  deleteProductById,
  toggleProductVisibility,
}