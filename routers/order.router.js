const express = require("express");
const { createOrders, getOrders, updateOrders, deleteOrders, getSingleOrder } = require("../controllers/order.controller");
const { checkAuthentication, checkAuthorization } = require("../middlewares/user/check.auth");
const validateOrder = require("../middlewares/user/order.validate");

const router = express.Router();

// add order
router.post('/', validateOrder, createOrders);

// all orders route
router.get("/", checkAuthentication, checkAuthorization, getOrders);

// get a single order
router.get("/:id", checkAuthentication, getSingleOrder);

// update orders
router.put("/:id", checkAuthentication, checkAuthorization, updateOrders);

// delete route
router.delete("/:id", checkAuthentication, checkAuthorization, deleteOrders);

module.exports = router;