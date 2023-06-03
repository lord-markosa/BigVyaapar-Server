"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const defaultController_1 = __importDefault(require("../controller/defaultController"));
const router = (0, express_1.Router)();
router.get("/", defaultController_1.default);
exports.default = router;
