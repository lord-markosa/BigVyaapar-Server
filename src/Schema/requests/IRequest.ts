import { Request } from "express";

export interface CurrentUser {
    userId: string;
    phoneNumber: string;
    name: string;
}

interface IRequest extends Request {
    user: CurrentUser;
}

export default IRequest;
