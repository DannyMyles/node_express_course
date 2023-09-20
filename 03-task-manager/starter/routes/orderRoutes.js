const express = require('express')
const router = express.Router()
const { createOrder, getAllorders } = require('../controllers/orderController')
// order routes
router.route("/orders").get(getAllorders).post(createOrder)
// router.route("/:id").post(loginUser)

// export the routes
module.exports = router