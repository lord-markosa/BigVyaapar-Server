import { Types } from "mongoose";

interface IProduct {
    name: string;
    description: string;
    price: number;
    trades: Array<Types.ObjectId>;
    userId: Types.ObjectId;
}

export default IProduct;
