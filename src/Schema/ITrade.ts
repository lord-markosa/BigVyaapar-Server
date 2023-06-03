import { Types } from "mongoose";
import IAddress from "./IAddress";

export enum TradeType {
    bid = "Bid",
    ask = "Ask",
}

interface ITrade {
    productId: Types.ObjectId;
    userId: Types.ObjectId;
    price: number;
    quantity: string;
    type: TradeType;
    address: IAddress;
}

export default ITrade;
