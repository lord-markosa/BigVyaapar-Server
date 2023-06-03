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
const express_validator_1 = require("express-validator");
const Product_1 = __importDefault(require("../../models/Product"));
const Trade_1 = __importDefault(require("../../models/Trade"));
const IErrorType_1 = __importDefault(require("../../schema/IErrorType"));
const Status_1 = __importDefault(require("../../schema/Status"));
const createError_1 = __importDefault(require("../../utils/createError"));
const createTrade = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            throw (0, createError_1.default)("Validation Failed", IErrorType_1.default.Validation, 422, errors.array());
        }
        const productId = req.params.productId;
        const product = yield Product_1.default.findById(productId);
        if (!product) {
            throw (0, createError_1.default)("Product with this id doesn't exists", IErrorType_1.default.NotFound, 404);
        }
        const newTrade = Object.assign(Object.assign({}, req.body), { productId, userId: req.user.userId });
        const trade = new Trade_1.default(newTrade);
        yield trade.save();
        product.trades.push(trade._id);
        yield product.save();
        const response = {
            status: Status_1.default.Success,
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
    }
    catch (err) {
        if (!err.statusCode) {
            const newError = (0, createError_1.default)("Error in create trade handler", IErrorType_1.default.ServerError, 500);
            next(newError);
        }
        else {
            next(err);
        }
    }
});
exports.default = createTrade;
