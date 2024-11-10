const productRepository = require('../repositories/product.repository');

// Add a new product
const addProduct = async (productData) => {
  try {
    return await productRepository.createProduct(productData);
  } catch (error) {
    throw new Error('Error adding product');
  }
};

// Get all approved products with pagination
const getApprovedProducts = async (page, limit, skip) => {
  try {
    const products = await productRepository.findApprovedProducts(limit, skip);
    if (!products) {
      throw new Error('No approved products found');
    }

    const totalProducts = await productRepository.countApprovedProducts();
    return {
      products,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
      totalProducts,
    };
  } catch (error) {
    throw new Error('Error retrieving approved products: ' + error.message);
  }
};

// Approve a product (admin action)
const approveProduct = async (productId) => {
  try {
    return await productRepository.updateProductById(productId, { isApproved: true });
  } catch (error) {
    throw new Error('Error approving product');
  }
};

// Delete a product (admin action)
const deleteProduct = async (productId) => {
  try {
    return await productRepository.deleteProductById(productId);
  } catch (error) {
    throw new Error('Error deleting product');
  }
};

// Update a product (admin action)
const updateProduct = async (productId, updateData) => {
  try {
    return await productRepository.updateProductById(productId, updateData);
  } catch (error) {
    throw new Error('Error updating product');
  }
};

// Get all products (admin only)
const getAllProducts = async (page, limit, skip) => {
  try {
    const products = await productRepository.getAllProducts(limit, skip);

    if (!products) {
      throw new Error('No products found');
    }

    const totalProducts = await productRepository.countAllProducts();
    return {
      products,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
      totalProducts,
    };
  } catch (error) {
    throw new Error('Error retrieving all products: ' + error.message);
  }
};

module.exports = { 
  addProduct, 
  getApprovedProducts, 
  approveProduct, 
  deleteProduct, 
  updateProduct,
  getAllProducts,
};
