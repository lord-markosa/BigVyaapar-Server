import { Schema, model } from "mongoose";
import IUser from "../Schema/IUser";

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    phoneNumber: { type: Number, require: true },
    password: { type: String, required: true },
});

const User = model<IUser>("User", userSchema);

export default User;
