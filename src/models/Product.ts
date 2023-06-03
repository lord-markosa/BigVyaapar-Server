import { Schema, model } from "mongoose";
import IProduct from "../schema/IProduct";

const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    price: { type: Number, require: true },
    description: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    trades: [{ type: Schema.Types.ObjectId, ref: "Trade" }],
});

const Product = model<IProduct>("Product", productSchema);

export default Product;
