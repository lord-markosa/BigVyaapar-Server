"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tradeSchema = new mongoose_1.Schema({
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Pproduct" },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    price: { type: Number, require: true },
    quantity: { type: String, require: true },
    type: { type: String, require: true },
    address: {
        firstLine: { type: String, required: true },
        secondLine: { type: String },
        district: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: Number, required: true },
    },
});
const Trade = (0, mongoose_1.model)("Trade", tradeSchema);
exports.default = Trade;
