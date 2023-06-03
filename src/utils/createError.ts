import IError from "../schema/IError";
import IErrorType from "../schema/IErrorType";
import Status from "../schema/Status";

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
