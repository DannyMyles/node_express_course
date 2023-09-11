const express = require('express')
const router = express.Router()
const { createProduct, getAllProducts, getSingleProduct } = require("../controllers/productControllers")
const multer = require("multer")

const upload = multer({ dest: './public/uploads' })

// products routes
router.route("/products").get(getAllProducts).post(upload.single('image'), createProduct)
router.route("/products/:id").get(getSingleProduct)

// export the routes
module.exports = router