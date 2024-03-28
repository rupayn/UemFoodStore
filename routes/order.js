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
    type:Object,
    required:true,
}],
  phone:{
    type:String,
    required:true,
  },
  address:{
    type:String,
    required:true,
  },
  paymentType:{
    type:String,
    default: `COD`
  },
  status:{
    type:String,
    default: `order_placed`
  }

}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

// Create the Order model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
