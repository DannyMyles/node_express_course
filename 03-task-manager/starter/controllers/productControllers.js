const Product = require("../models/productModel");
const asyncWrapper = require("../middleware/asyncMiddleware");

// Post product
const createProduct = asyncWrapper(async (req, res) => {
  // Create a new Product
  const newproduct = new Product({
    title: req.body.title,
    description: req.body.description,
    image: req.file.filename,
    price: req.body.price,
    category: req.body.category,
    size: req.body.size,
    color: req.body.color,
  });

  const saveProduct = await newproduct.save();
  res.status(201).json({ saveProduct });
});

// get all products
const getAllProducts = asyncWrapper(async (req, res) => {
  const products = await Product.find({});
  if (!products) {
    res.status(409).json({ err: err });
  }
  res.status(200).json({ products });
});

// get a product
const getSingleProduct = asyncWrapper(async (req, res) => {
  // get the productId from the params
  const productId = req.params.id;

  const product = await Product.findById(productId);

  if (!product) {
    res.status(404).json({ err: err });
  }
  res.status(200).json({ product });
});

module.exports = { createProduct, getAllProducts, getSingleProduct };
