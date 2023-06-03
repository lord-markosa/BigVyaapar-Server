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
const Trade_1 = __importDefault(require("../../models/Trade"));
const IErrorType_1 = __importDefault(require("../../schema/error/IErrorType"));
const Status_1 = __importDefault(require("../../schema/response/Status"));
const createError_1 = __importDefault(require("../../utils/createError"));
const updateTrade = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            throw (0, createError_1.default)("Validation Failed", IErrorType_1.default.Validation, 422, errors.array());
        }
        const tradeId = req.params.tradeId;
        const trade = yield Trade_1.default.findById(tradeId);
        if (!trade) {
            throw (0, createError_1.default)("Trade with this id doesn't exists", IErrorType_1.default.NotFound, 404);
        }
        const updatedTrade = req.body;
        trade.quantity = updatedTrade.quantity;
        trade.address = updatedTrade.address;
        trade.price = updatedTrade.price;
        yield trade.save();
        const response = {
            status: Status_1.default.Success,
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
    }
    catch (err) {
        if (!err.statusCode) {
            const newError = (0, createError_1.default)("Error in update trade handler", IErrorType_1.default.ServerError, 500);
            next(newError);
        }
        else {
            next(err);
        }
    }
});
exports.default = updateTrade;
