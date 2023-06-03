import IUserResponse from "./IUserResponse";
import Status from "../Status";

interface IAuthResponse {
    status: Status;
    message: string;
    user: IUserResponse;
    token: string;
}

export default IAuthResponse;
