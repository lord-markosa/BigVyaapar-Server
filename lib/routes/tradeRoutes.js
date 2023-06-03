"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createTrade_1 = __importDefault(require("../controller/tradeControllers/createTrade"));
const deleteTrade_1 = __importDefault(require("../controller/tradeControllers/deleteTrade"));
const updateTrade_1 = __importDefault(require("../controller/tradeControllers/updateTrade"));
const isAuth_1 = __importDefault(require("../middleware/isAuth"));
const tradeValidation_1 = __importDefault(require("../middleware/validation/tradeValidation"));
const router = (0, express_1.Router)();
router.use(isAuth_1.default);
router.post("/new/:productId", tradeValidation_1.default, createTrade_1.default);
router.put("/update/:tradeId", tradeValidation_1.default, updateTrade_1.default);
router.delete("/delete/:tradeId", deleteTrade_1.default);
exports.default = router;
