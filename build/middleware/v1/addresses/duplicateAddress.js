"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressValidate = void 0;
const messages_1 = require("../../../models/messages");
const database_1 = require("../../../database/database");
const addressValidate = (req, res, next) => {
    const requiredFields = ['line1', 'city', 'state', 'zip'];
    const givenFields = Object.getOwnPropertyNames(req.body.data);
    if (!requiredFields.every(field => givenFields.includes(field))) {
        return next(new messages_1.APIError('Missing Data', 'Post request is missing data', 400));
    }
    const address = {
        line1: req.body.data.line1,
        line2: req.body.data.line2 || null,
        city: req.body.data.city,
        state: req.body.data.state,
        zip: req.body.data.zip,
    };
    database_1.pool.connect().then(client => {
        client.query('SELECT * FROM addresses WHERE line1 = $1 AND city = $2 AND state = $3 AND zip = $4', [address.line1, address.city, address.state, address.zip])
            .then(result => {
            if (result.rowCount > 0) {
                throw new Error(new messages_1.APIError('Duplicate', 'Address already exists', 400)
                    .toString());
            }
            else {
                next();
            }
        }).catch(err => {
            console.log('Error: ', err);
            return next(new messages_1.APIError('Api Error', err.message, 422));
        });
    });
};
exports.addressValidate = addressValidate;
