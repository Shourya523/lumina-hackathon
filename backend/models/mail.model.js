import { Schema, model } from "mongoose";

const mailSchema = new Schema({
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

export const Mail = model("Mail", mailSchema);