const mongoose = require('mongoose');

// Define the schema for the Order model
const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
  },
  items: [{
    // Assuming a simple schema for items
    name: String,
    quantity: Number,
    price: Number
  }],
//   totalPrice: {
//     type: Number,
//     required: true
//   },
  // You can add more fields as needed
  // For example: address, status, deliveryTime, etc.
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

// Create the Order model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
