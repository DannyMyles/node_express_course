const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: String, unique: true, required: true },
  product: [
    {
      productId: { type: String },
      quantity: { type: String, default: "1" },
    },
  ],
}, {
	timestamps: true
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
