import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getCart, addToCart, updateQuantity, removeItem, clearCart } from "../controllers/canteenCart.controller.js";

const router = express.Router();

router.get("/", verifyToken, getCart);
router.post("/add", verifyToken, addToCart);
router.put("/update", verifyToken, updateQuantity);
router.delete("/remove", verifyToken, removeItem);
router.delete("/clear", verifyToken, clearCart);

export default router;
