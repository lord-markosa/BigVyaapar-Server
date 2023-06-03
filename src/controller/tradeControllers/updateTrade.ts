import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import Trade from "../../models/Trade";
import IError from "../../schema/IError";
import IErrorType from "../../schema/IErrorType";
import ITrade from "../../schema/ITrade";
import Status from "../../schema/Status";
import ITradeResponse from "../../schema/ITradeResponse";
import createError from "../../utils/createError";

const updateTrade: RequestHandler = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw createError(
                "Validation Failed",
                IErrorType.Validation,
                422,
                errors.array()
            );
        }

        const tradeId = req.params.tradeId;
        const trade = await Trade.findById(tradeId);

        if (!trade) {
            throw createError(
                "Trade with this id doesn't exists",
                IErrorType.NotFound,
                404
            );
        }

        const updatedTrade: ITrade = req.body;
        trade.quantity = updatedTrade.quantity;
        trade.address = updatedTrade.address;
        trade.price = updatedTrade.price;

        await trade.save();

        const response: ITradeResponse = {
            status: Status.Success,
            message: "Updated trade",
            trade: {
                tradeId: trade._id.toString(),
                address: trade.address,
                quantity: trade.quantity,
                price: trade.price,
                type: trade.type,
            },
        };

        res.status(201).json(response);
    } catch (err) {
        if (!(err as IError).statusCode) {
            const newError = createError(
                "Error in update trade handler",
                IErrorType.ServerError,
                500
            );
            next(newError);
        } else {
            next(err);
        }
    }
};

export default updateTrade;
