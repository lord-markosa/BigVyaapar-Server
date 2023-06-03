import Status from "../Status";
import TradeReturnType from "../TradeReturnType";

interface ITradeResponse {
    status: Status;
    message: string;
    trade: TradeReturnType;
}

export default ITradeResponse;
