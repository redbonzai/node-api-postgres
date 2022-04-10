"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiValidation = void 0;
const messages_1 = require("../../../models/messages");
const apiValidation = (req, res, next) => {
    if (req.header('Accept') !== 'application/json' || req.header('Content-Type') !== 'application/json') {
        next(new messages_1.APIError('Unacceptable content', 'Only json is supported', 400));
    }
    else {
        next();
    }
};
exports.apiValidation = apiValidation;
