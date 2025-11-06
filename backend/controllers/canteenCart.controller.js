import { CanteenCart } from "../models/cart.model.js";
import { errorHandler } from "../utils/errors.js";

export const getCart = async (req, res, next) => {
    try {
        const cart = await CanteenCart.findOne({ userId: req.user.id });
        if (!cart) return res.status(200).json({ items: [] });
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

export const addToCart = async (req, res, next) => {
    const { itemId, name, price, quantity } = req.body;

    try {
        let cart = await CanteenCart.findOne({ userId: req.user.id });

        // Allow adding items without itemId (for frontend orders)
        const itemToAdd = { name, price, quantity };
        if (itemId) itemToAdd.itemId = itemId;

        if (!cart) {
            cart = new CanteenCart({
                userId: req.user.id,
                items: [itemToAdd]
            });
        } else {
            // Match by name if itemId is not present
            let existingItem;
            if (itemId) {
                existingItem = cart.items.find(item => item.itemId && item.itemId.toString() === itemId);
            } else {
                existingItem = cart.items.find(item => item.name === name);
            }
            if (existingItem) {
                existingItem.quantity += quantity || 1;
            } else {
                cart.items.push(itemToAdd);
            }
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

export const updateQuantity = async (req, res, next) => {
    const { itemId, quantity } = req.body;

    try {
        const cart = await CanteenCart.findOne({ userId: req.user.id });
        if (!cart) return next(errorHandler(404, "Cart not found"));

        const item = cart.items.find(i => i.itemId.toString() === itemId);
        if (!item) return next(errorHandler(404, "Item not found in cart"));

        item.quantity = quantity;
        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

export const removeItem = async (req, res, next) => {
    const { itemId } = req.body;

    try {
        const cart = await CanteenCart.findOne({ userId: req.user.id });
        if (!cart) return next(errorHandler(404, "Cart not found"));

        cart.items = cart.items.filter(i => i.itemId.toString() !== itemId);
        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

export const clearCart = async (req, res, next) => {
    try {
        const cart = await CanteenCart.findOne({ userId: req.user.id });
        if (!cart) return res.status(200).json({ items: [] });

        cart.items = [];
        await cart.save();

        res.status(200).json({ message: "Cart cleared" });
    } catch (error) {
        next(error);
    }
};
