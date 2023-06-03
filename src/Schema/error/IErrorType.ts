enum IErrorType {
    Validation = "validation",
    ServerError = "server error",
    InvalidCred = "invalid credential",
    TokenMissed = "missing token",
    Unauthorized = "action is not authorized",
    NotFound = "object not found",
}

export default IErrorType;
