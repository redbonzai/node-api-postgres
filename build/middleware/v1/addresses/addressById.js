"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressById = void 0;
const database_1 = require("../../../database/database");
const messages_1 = require("../../../models/messages");
const AddressSummary_1 = require("../../../models/shared/AddressSummary");
const addressById = (req, res, next) => {
    database_1.pool.connect().then(client => {
        client.query('SELECT * FROM addresses WHERE id = $1', [req.params.id])
            .then(result => {
            if (result.rows.length === 0) {
                throw new Error('Address not found');
            }
            return res.status(200).json({
                data: result.rows.map((item) => new AddressSummary_1.AddressSummary(item))
            });
        })
            .catch(err => {
            client.release();
            console.log(err.stack);
            return next(new messages_1.APIError('Api Error', err.message, 422));
        });
    }).catch(err => {
        console.log(err.stack);
        return next(new messages_1.APIError('Api Connection Error', err.message, 422));
    });
};
exports.addressById = addressById;
