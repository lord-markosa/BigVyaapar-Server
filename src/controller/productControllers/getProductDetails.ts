import { RequestHandler } from "express";
import { Types } from "mongoose";
import Product from "../../models/Product";
import IError from "../../schema/IError";
import IErrorType from "../../schema/IErrorType";
import ITrade from "../../schema/ITrade";
import IGetProductDetailResponse from "../../schema/IGetProductDetailResponse";
import Status from "../../schema/Status";
import createError from "../../utils/createError";

interface populateProduct {
    trades: (ITrade & { _id: Types.ObjectId })[] | null;
}

const getProductDetails: RequestHandler = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId).populate<
            Pick<populateProduct, "trades">
        >("trades");

        if (!product) {
            throw createError(
                "Product with this id doesn't exists",
                IErrorType.NotFound,
                404
            );
        }

        const trades = product.trades?.map((trade) => ({
            tradeId: trade._id.toString(),
            type: trade.type,
            price: trade.price,
            quantity: trade.quantity,
            address: trade.address,
        }));

        const response: IGetProductDetailResponse = {
            status: Status.Success,
            message: "Fetched product details",
            product: {
                productId: product._id.toString(),
                name: product.name,
                description: product.description,
                price: product.price,
            },
            trades: trades ?? [],
        };

        res.status(200).json(response);
    } catch (err) {
        if (!(err as IError).statusCode) {
            const newError = createError(
                "Error in product details handler",
                IErrorType.ServerError,
                500
            );
            next(newError);
        } else {
            next(err);
        }
    }
};

export default getProductDetails;
