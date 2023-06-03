import { RequestHandler } from "express";
import Product from "../../models/Product";
import Trade from "../../models/Trade";
import IError from "../../schema/IError";
import IErrorType from "../../schema/IErrorType";
import IRequest from "../../schema/IRequest";
import IDeleteResponse from "../../schema/IDeleteResponse";
import Status from "../../schema/Status";
import createError from "../../utils/createError";

const deleteTrade: RequestHandler = async (req, res, next) => {
    try {
        const tradeId = req.params.tradeId;
        const trade = await Trade.findById(tradeId);
        if (!trade) {
            throw createError(
                "Trade with this id doesn't exists",
                IErrorType.NotFound,
                404
            );
        }

        if (trade.userId.toString() !== (req as IRequest).user.userId) {
            throw createError(
                "User not authorized for the action",
                IErrorType.Unauthorized,
                403
            );
        }

        const product = await Product.findById(trade.productId);
        if (!product) {
            throw createError(
                "Product with this id doesn't exists",
                IErrorType.NotFound,
                404
            );
        }

        product.trades = product.trades.filter(
            (id) => id.toString() !== tradeId
        );

        await product.save();
        await trade.deleteOne();

        const response: IDeleteResponse = {
            message: "Trade deleted",
            status: Status.Success,
        };

        res.status(200).json(response);
    } catch (err) {
        if (!(err as IError).statusCode) {
            const newError = createError(
                "Error in delete trade handler",
                IErrorType.ServerError,
                500
            );
            next(newError);
        } else {
            next(err);
        }
    }
};

export default deleteTrade;
