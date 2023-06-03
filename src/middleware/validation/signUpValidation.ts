import { body } from "express-validator";
import User from "../../models/User";

function isValidGstin(gstin: string) {
    return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(
        gstin
    );
}

const signUpValidation = [
    body("phoneNumber")
        .trim()
        .notEmpty()
        .isMobilePhone("en-IN")
        .custom(async (value) => {
            const user = await User.findOne({ phoneNumber: value });
            if (user) {
                return Promise.reject("Phone number already in use");
            }
        }),
    body("name").trim().notEmpty().isLength({ min: 3 }),
    body("password")
        .trim()
        .notEmpty()
        .isStrongPassword({
            minLength: 6,
            minNumbers: 1,
            minUppercase: 1,
            minSymbols: 1,
        })
        .withMessage("Password not strong enough"),
    body("gstin")
        .trim()
        .notEmpty()
        .custom(async (value) => {
            const user = await User.findOne({ gstin: value });
            if (!isValidGstin(value)) {
                return Promise.reject("Invalid GSTIN");
            }
            if (user) {
                return Promise.reject("GSTIN already in use");
            }
        }),
];

export default signUpValidation;

//     "A strong password should contain:\n 1. min 6 characters\n 2. min 1 numeric character\n 3. min 1 uppercase\n 4. min 1 symbol"
