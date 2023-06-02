import { Schema, model } from "mongoose";
import IProduct from "../schema/IProduct";

const productSchema = new Schema<IProduct>({
    category: { type: String, required: true },
    quantity: { type: String, required: true },
    price: { type: Number, require: true },
    address: {
        firstLine: { type: String, required: true },
        secondLine: { type: String },
        district: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: Number, required: true },
    },
    description: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const Product = model<IProduct>("Product", productSchema);

export default Product;
