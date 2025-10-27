const express = require("express");
const { createOrders, getOrders, updateOrders, deleteOrders } = require("../controllers/order.controller");
const { checkAuthentication, checkAuthorization } = require("../middlewares/user/check.auth");
const validateOrder = require("../middlewares/user/order.validate");

const router = express.Router();

// add order
router.post('/', validateOrder, createOrders);

// all orders route
router.get("/", checkAuthentication, checkAuthorization, getOrders);

// update orders
router.put("/:id", checkAuthentication, checkAuthorization, updateOrders);

// delete route
router.delete("/:id", checkAuthentication, checkAuthorization, deleteOrders);

module.exports = router;