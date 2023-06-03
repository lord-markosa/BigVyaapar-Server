import IErrorType from "./IErrorType";
import Status from "../response/Status";

interface IErrorResponse {
    description: string;
    status: Status;
    errorType: IErrorType;
    statusCode: number;
    data: any;
}

export default IErrorResponse;
