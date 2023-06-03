import Status from "../Status";
import TradeReturnType from "../TradeReturnType";
import ProductReturnType from "./ProductReturnType";

interface IGetProductDetailResponse {
    status: Status;
    message: string;
    product: ProductReturnType;
    trades: Array<TradeReturnType>;
}

export default IGetProductDetailResponse;
