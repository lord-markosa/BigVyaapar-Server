import IAddress from "../IAddress";
import { TradeType } from "../ITrade";

interface TradeReturnType {
    tradeId: string;
    type: TradeType;
    price: number;
    quantity: string;
    address: IAddress;
}

export default TradeReturnType;
