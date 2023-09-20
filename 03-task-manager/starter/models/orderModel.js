const mongoose = require("mongoose");
const Product = require("./productModel");


const orderSchema = new mongoose.Schema(
  {
    // link a user to an order
    userId: {
      type: mongoose.Types.ObjectId
    },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId }, // Use 'product' here
        quantity: { type: String, default: "1" },
      },
    ],
    totalAmount: { type: Number, required: true },
    address: { type: String, required: true },
    status: { type: String, default: "pending" },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
