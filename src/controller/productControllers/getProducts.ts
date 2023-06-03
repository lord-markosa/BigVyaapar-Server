import { RequestHandler } from "express";
import Product from "../../models/Product";
import IError from "../../schema/error/IError";
import IErrorType from "../../schema/error/IErrorType";
import IGetProductsResponse from "../../schema/response/product/IGetProductsResponse";
import Status from "../../schema/response/Status";
import createError from "../../utils/createError";

const getProducts: RequestHandler = async (req, res, next) => {
    try {
        const products = await Product.find();

        const responseProducts = products.map((product) => ({
            productId: product._id.toString(),
            name: product.name,
            description: product.description,
            price: product.price,
        }));
        const response: IGetProductsResponse = {
            status: Status.Success,
            message: "Fetched all products",
            products: responseProducts,
        };

        res.status(200).json(response);
    } catch (err) {
        if (!(err as IError).statusCode) {
            const newError = createError(
                "Error in get product handler",
                IErrorType.ServerError,
                500
            );
            next(newError);
        } else {
            next(err);
        }
    }
};

export default getProducts;
