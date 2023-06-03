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
const Trade_1 = __importDefault(require("../../models/Trade"));
const IErrorType_1 = __importDefault(require("../../schema/error/IErrorType"));
const Status_1 = __importDefault(require("../../schema/response/Status"));
const createError_1 = __importDefault(require("../../utils/createError"));
const deleteTrade = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tradeId = req.params.tradeId;
        const trade = yield Trade_1.default.findById(tradeId);
        if (!trade) {
            throw (0, createError_1.default)("Trade with this id doesn't exists", IErrorType_1.default.NotFound, 404);
        }
        if (trade.userId.toString() !== req.user.userId) {
            throw (0, createError_1.default)("User not authorized for the action", IErrorType_1.default.Unauthorized, 403);
        }
        const product = yield Product_1.default.findById(trade.productId);
        if (!product) {
            throw (0, createError_1.default)("Product with this id doesn't exists", IErrorType_1.default.NotFound, 404);
        }
        product.trades = product.trades.filter((id) => id.toString() !== tradeId);
        yield product.save();
        yield trade.deleteOne();
        const response = {
            message: "Trade deleted",
            status: Status_1.default.Success,
        };
        res.status(200).json(response);
    }
    catch (err) {
        if (!err.statusCode) {
            const newError = (0, createError_1.default)("Error in delete trade handler", IErrorType_1.default.ServerError, 500);
            next(newError);
        }
        else {
            next(err);
        }
    }
});
exports.default = deleteTrade;
