"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const loginValidation = [
    (0, express_validator_1.body)("phoneNumber").trim().isMobilePhone("en-IN"),
    (0, express_validator_1.body)("password").trim(),
];
exports.default = loginValidation;
