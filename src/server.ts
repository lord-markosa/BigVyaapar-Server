import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import productRoutes from "./routes/productRoutes";
import defaultRoute from "./routes/defaultRoute";
import authRoutes from "./routes/authRoutes";
import tradeRoutes from "./routes/tradeRoutes";
import errorHandler from "./middleware/errorHandler";
import setHeaderConfig from "./middleware/setHeaderConfig";
import { mongodbUser, mongodbPass, port } from "./constants";

const app = express();

app.use(cors());
app.use(helmet());
app.use(setHeaderConfig);
app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use("/trade", tradeRoutes);
app.use("/", defaultRoute);
app.use(errorHandler);

// DATABASE CONNECTION
const url = `mongodb+srv://${mongodbUser}:${mongodbPass}@projectv.5nrvym2.mongodb.net/`;

mongoose.connect(url).then((result) => {
    app.listen(port);
});
