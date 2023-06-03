import { Schema, model } from "mongoose";
import ITrade from "../schema/ITrade";

const tradeSchema = new Schema<ITrade>({
    productId: { type: Schema.Types.ObjectId, ref: "Pproduct" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
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

const Trade = model<ITrade>("Trade", tradeSchema);

export default Trade;
