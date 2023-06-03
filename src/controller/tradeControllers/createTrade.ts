import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import Product from "../../models/Product";
import Trade from "../../models/Trade";
import IError from "../../schema/error/IError";
import IErrorType from "../../schema/error/IErrorType";
import ITrade from "../../schema/ITrade";
import IRequest from "../../schema/requests/IRequest";
import Status from "../../schema/response/Status";
import ITradeResponse from "../../schema/response/trade/ITradeResponse";
import createError from "../../utils/createError";

const createTrade: RequestHandler = async (req, res, next) => {
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

        const productId = req.params.productId;
        const product = await Product.findById(productId);
        if (!product) {
            throw createError(
                "Product with this id doesn't exists",
                IErrorType.NotFound,
                404
            );
        }

        const newTrade: ITrade = {
            ...req.body,
            productId,
            userId: (req as IRequest).user.userId,
        };

        const trade = new Trade(newTrade);
        await trade.save();

        product.trades.push(trade._id);
        await product.save();

        const response: ITradeResponse = {
            status: Status.Success,
            message: "Created new trade",
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
                "Error in create trade handler",
                IErrorType.ServerError,
                500
            );
            next(newError);
        } else {
            next(err);
        }
    }
};

export default createTrade;
