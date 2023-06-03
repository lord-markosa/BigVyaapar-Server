"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_1 = __importDefault(require("../controller/authControllers/login"));
const signUp_1 = __importDefault(require("../controller/authControllers/signUp"));
const loginValidation_1 = __importDefault(require("../middleware/validation/loginValidation"));
const signUpValidation_1 = __importDefault(require("../middleware/validation/signUpValidation"));
const router = (0, express_1.Router)();
router.post("/signUp", signUpValidation_1.default, signUp_1.default);
router.post("/login", loginValidation_1.default, login_1.default);
exports.default = router;
