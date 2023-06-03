"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
function isAlpha(str) {
    return /^[a-zA-Z0-9]+$/.test(str);
}
function isNumeric(str) {
    return /^[0-9]+$/.test(str);
}
const tradeValidation = [
    (0, express_validator_1.body)("price").trim().notEmpty().isNumeric(),
    (0, express_validator_1.body)("quantity").trim().notEmpty(),
    (0, express_validator_1.body)("type").trim().notEmpty(),
    (0, express_validator_1.body)("address")
        .notEmpty()
        .custom((value) => {
        const { firstLine, district, state, pincode } = value;
        if (firstLine.length !== 0 &&
            district.length !== 0 &&
            isAlpha(district) &&
            state.length !== 0 &&
            isAlpha(state) &&
            pincode.length === 6 &&
            isNumeric(pincode)) {
            return true;
        }
        return Promise.reject("Address not valid");
    }),
];
exports.default = tradeValidation;
