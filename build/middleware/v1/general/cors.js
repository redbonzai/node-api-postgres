"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiCors = void 0;
const apiCors = (req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Credentials': true
    });
    next();
};
exports.apiCors = apiCors;
