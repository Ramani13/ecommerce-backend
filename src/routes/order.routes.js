// src/routes/order.routes.js
import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrders,
} from "../controllers/order.controller.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

// Create new order (user must be logged in)
router.post("/", protect, addOrderItems);

// Get user’s own orders
router.get("/myorders", protect, getMyOrders);

// Admin: get all orders
router.get("/", protect, admin, getOrders);

export default router;
