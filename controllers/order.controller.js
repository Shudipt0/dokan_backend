const Order = require("../models/order.model");


// create order
async function createOrders(req, res, next) {
  const order = req.body;
  try{
    await Order.create(order);
    res.status(200).json({
        message: 'Order created successfully!'
    })
  }catch(error){
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

// get all orders
async function getOrders(req, res, next) {
  try{
    const orders = await Order.find({});
    res.status(200).json({
        orders: orders,
    })
  }catch(error){
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

// update orders
async function updateOrders(req, res, next) {
    const {id} = req.params;
    const updates = req.body;
  try{
    await Order.findByIdAndUpdate(id, { $set: updates }, { new: true });
    res.status(200).json({ message: "User updated successfully!" });
  }catch(error){
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

// delate order
async function deleteOrders(req, res, next) {
    const {id} = req.params;
  try{
    await Order.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully!" });
  }catch(error){
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = {createOrders, getOrders,updateOrders,deleteOrders}