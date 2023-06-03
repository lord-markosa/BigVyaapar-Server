"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const productValidation = [
    (0, express_validator_1.body)("name").trim().notEmpty(),
    (0, express_validator_1.body)("description").trim(),
    (0, express_validator_1.body)("price").trim().notEmpty().isNumeric(),
];
exports.default = productValidation;
