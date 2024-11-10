const productService = require('../services/product.service');

exports.addProduct = async (req, res) => {
  try {
    const product = await productService.addProduct({ ...req.body, createdBy: req.user.id });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Product creation failed' });
  }
};
