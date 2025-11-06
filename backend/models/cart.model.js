import { Schema, model } from "mongoose";

const cartItemSchema = new Schema({
    itemId: {
        type: Schema.Types.ObjectId,
        ref: "MenuItem",
        required: false // Make itemId optional for frontend orders
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
        min: 1
    }
});

const canteenCartSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },
        items: [cartItemSchema]
    },
    { timestamps: true }
);

export const CanteenCart = model("CanteenCart", canteenCartSchema);
