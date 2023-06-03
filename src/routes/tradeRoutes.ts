import { Router } from "express";
import createTrade from "../controller/tradeControllers/createTrade";
import deleteTrade from "../controller/tradeControllers/deleteTrade";
import updateTrade from "../controller/tradeControllers/updateTrade";
import isAuth from "../middleware/isAuth";
import tradeValidation from "../middleware/validation/tradeValidation";

const router = Router();

router.use(isAuth);
router.post("/new/:productId", tradeValidation, createTrade);
router.put("/update/:tradeId", tradeValidation, updateTrade);
router.delete("/delete/:tradeId", deleteTrade);

export default router;
