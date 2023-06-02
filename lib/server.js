"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const defaultRoute_1 = __importDefault(require("./routes/defaultRoute"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const setHeaderConfig_1 = __importDefault(require("./middleware/setHeaderConfig"));
const constants_1 = require("./constants");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(setHeaderConfig_1.default);
app.use(body_parser_1.default.json());
app.use("/auth", authRoutes_1.default);
app.use("/product", productRoutes_1.default);
app.use("/", defaultRoute_1.default);
app.use(errorHandler_1.default);
// DATABASE CONNECTION
const url = `mongodb+srv://${constants_1.mongodbUser}:${constants_1.mongodbPass}@projectv.5nrvym2.mongodb.net/`;
mongoose_1.default.connect(url).then((result) => {
    app.listen(constants_1.port);
});
