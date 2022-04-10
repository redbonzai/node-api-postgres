"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicInfo = exports.PublicError = exports.APIError = void 0;
class APIError extends Error {
    constructor(name, message, status, properties, internalProperties) {
        super();
        this.status = status;
        this.properties = properties;
        this.internalProperties = internalProperties;
        this.name = name;
        this.message = message;
    }
    /**
     * Convert APIError object to a PublicError object.
     */
    publicError() {
        return new PublicError(this);
    }
    static notFoundException(properties, internalProperties) {
        return new APIError('NotFoundException', 'Specified resource could not be found', 404, properties, internalProperties);
    }
    static invalidQueryParameter(properties, internalProperties) {
        return new APIError('InvalidQueryParameter', 'Invalid query parameter', 400, properties, internalProperties);
    }
    static missingBodyException(properties, internalProperties) {
        return new APIError('MissingBodyException', 'Missing data in request', 400, properties, internalProperties);
    }
    static serverError(properties, internalProperties) {
        return new APIError('ServerError', 'Internal request failed', 500, properties, internalProperties);
    }
}
exports.APIError = APIError;
class PublicError {
    constructor(err) {
        this.name = err.name;
        this.message = err.message;
        this.status = err.status;
        this.properties = err.properties;
    }
}
exports.PublicError = PublicError;
class PublicInfo {
    constructor(message, status, properties) {
        this.message = message;
        this.status = status;
        this.properties = properties;
    }
    static infoDeleted(properties) {
        return new PublicInfo('Resource deleted', 200, properties);
    }
    static infoCreated(properties) {
        return new PublicInfo('Resource created', 201, properties);
    }
    static infoUpdated(properties) {
        return new PublicInfo('Resource updated', 200, properties);
    }
}
exports.PublicInfo = PublicInfo;
