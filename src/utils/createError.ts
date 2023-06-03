import IError from "../schema/error/IError";
import IErrorType from "../schema/error/IErrorType";
import Status from "../schema/response/Status";

export default function createError(
    description: string,
    errorType: IErrorType,
    statusCode: number,
    data?: any
): IError {
    const error: IError = {
        ...new Error(),
        description,
        status: Status.Failed,
        errorType,
        statusCode,
        data,
    };

    return error;
}
