import { Router } from "express";
import createProduct from "../controller/productControllers/createProduct";
import deleteProduct from "../controller/productControllers/deleteProduct";
import getProductDetails from "../controller/productControllers/getProductDetails";
import getProducts from "../controller/productControllers/getProducts";
import updateProduct from "../controller/productControllers/updateProduct";
import isAuth from "../middleware/isAuth";
import productValidation from "../middleware/validation/productValidation";

const router = Router();

router.use(isAuth);
router.get("/all", getProducts);
router.get("/:productId", getProductDetails);
router.post("/new", productValidation, createProduct);
router.put("/update/:productId", productValidation, updateProduct);
router.delete("/delete/:productId", deleteProduct);

export default router;
