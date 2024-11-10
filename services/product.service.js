const productRepository = require('../repositories/product.repository');

const addProduct = async (productData) => productRepository.createProduct(productData);
const updateProduct = async (productId, updateData) => productRepository.updateProductById(productId, updateData);
const deleteProduct = async (productId) => productRepository.deleteProductById(productId);
const toggleVisibility = async (productId) => productRepository.toggleProductVisibility(productId);

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  toggleVisibility,
};