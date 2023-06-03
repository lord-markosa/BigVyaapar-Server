import { body } from "express-validator";

function isAlpha(str: string) {
    return /^[a-zA-Z0-9]+$/.test(str);
}

function isNumeric(str: string) {
    return /^[0-9]+$/.test(str);
}

const tradeValidation = [
    body("price").trim().notEmpty().isNumeric(),
    body("quantity").trim().notEmpty(),
    body("type").trim().notEmpty(),
    body("address")
        .notEmpty()
        .custom((value) => {
            const { firstLine, district, state, pincode } = value;
            if (
                firstLine.length !== 0 &&
                district.length !== 0 &&
                isAlpha(district) &&
                state.length !== 0 &&
                isAlpha(state) &&
                pincode.length === 6 &&
                isNumeric(pincode)
            ) {
                return true;
            }
            return Promise.reject("Address not valid");
        }),
];

export default tradeValidation;
