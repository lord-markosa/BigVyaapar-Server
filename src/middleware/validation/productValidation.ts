import { body } from "express-validator";

const productValidation = [
    body("name").trim().notEmpty(),
    body("description").trim(),
    body("price").trim().notEmpty().isNumeric(),
];

export default productValidation;
