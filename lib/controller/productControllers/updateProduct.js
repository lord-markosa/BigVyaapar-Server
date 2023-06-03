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
const IErrorType_1 = __importDefault(require("../../schema/error/IErrorType"));
const Status_1 = __importDefault(require("../../schema/response/Status"));
const createError_1 = __importDefault(require("../../utils/createError"));
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            throw (0, createError_1.default)("Validation Failed", IErrorType_1.default.Validation, 422, errors.array());
        }
        const productId = req.params.productId;
        let product = yield Product_1.default.findById(productId);
        if (!product) {
            throw (0, createError_1.default)("Product with this id doesn't exists", IErrorType_1.default.NotFound, 404);
        }
        if (product.userId.toString() !== req.user.userId) {
            throw (0, createError_1.default)("User not authorized for the action", IErrorType_1.default.Unauthorized, 403);
        }
        const updatedProduct = req.body;
        product.description = updatedProduct.description;
        product.price = updatedProduct.price;
        product.name = updatedProduct.name;
        yield product.save();
        const response = {
            status: Status_1.default.Success,
            message: " Product updated",
            product: {
                productId: product._id.toString(),
                name: product.name,
                description: product.description,
                price: product.price,
            },
        };
        res.status(201).json(response);
    }
    catch (err) {
        if (!err.statusCode) {
            const newError = (0, createError_1.default)("Error in update product handler", IErrorType_1.default.ServerError, 500);
            next(newError);
        }
        else {
            next(err);
        }
    }
});
exports.default = updateProduct;
