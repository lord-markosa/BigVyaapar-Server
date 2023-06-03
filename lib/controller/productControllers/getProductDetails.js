"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("../../models/Product"));
const IErrorType_1 = __importDefault(require("../../schema/error/IErrorType"));
const Status_1 = __importDefault(require("../../schema/response/Status"));
const createError_1 = __importDefault(require("../../utils/createError"));
const getProductDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const productId = req.params.productId;
        const product = yield Product_1.default.findById(productId).populate("trades");
        if (!product) {
            throw (0, createError_1.default)("Product with this id doesn't exists", IErrorType_1.default.NotFound, 404);
        }
        const trades = (_a = product.trades) === null || _a === void 0 ? void 0 : _a.map((trade) => ({
            tradeId: trade._id.toString(),
            type: trade.type,
            price: trade.price,
            quantity: trade.quantity,
            address: trade.address,
        }));
        const response = {
            status: Status_1.default.Success,
            message: "Fetched product details",
            product: {
                productId: product._id.toString(),
                name: product.name,
                description: product.description,
                price: product.price,
            },
            trades: trades !== null && trades !== void 0 ? trades : [],
        };
        res.status(200).json(response);
    }
    catch (err) {
        if (!err.statusCode) {
            const newError = (0, createError_1.default)("Error in product details handler", IErrorType_1.default.ServerError, 500);
            next(newError);
        }
        else {
            next(err);
        }
    }
});
exports.default = getProductDetails;
