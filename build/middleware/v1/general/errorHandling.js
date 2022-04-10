"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    switch (req.app.get('env')) {
        case 'development':
            console.log('error: ', err);
            return res.status(err.status).json(err);
        case 'production':
            // only logging in production
            return res.status(err.status).json(err.publicError());
    }
};
exports.errorHandler = errorHandler;
