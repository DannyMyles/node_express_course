const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
	title: {type: String, unique : true , required: true},
	description: {type: String, unique : true , required: true},
	image: {type: [String] , required: true},
	price:{ type: Number, required: true },
	category:{type: [String] },
	size: { type: Number},
	color:{ type: String},
	
})
const Product = mongoose.model("Product", productSchema);

module.exports = Product;