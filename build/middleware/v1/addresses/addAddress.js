"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAddress = void 0;
const messages_1 = require("../../../models/messages");
const database_1 = require("../../../database/database");
const addAddress = (req, res, next) => {
    const newAddress = {
        line1: req.body.data.line1,
        line2: req.body.data.line2 || null,
        city: req.body.data.city,
        state: req.body.data.state,
        zip: req.body.data.zip,
    };
    database_1.pool.connect().then(client => {
        client.query('INSERT INTO addresses (line1, line2, city, state, zip) VALUES ($1, $2, $3, $4, $5)', [newAddress.line1, newAddress.line2, newAddress.city, newAddress.state, newAddress.zip])
            .then(result => {
            res.status(201).json({
                status: 'success',
                data: {
                    line1: newAddress.line1,
                    line2: newAddress.line2,
                    city: newAddress.city,
                    state: newAddress.state,
                    zip: newAddress.zip,
                }
            });
        })
            .catch(err => {
            console.log('Error: ', err);
            console.log('Error status: ', err.status);
            return next(new messages_1.APIError('Api Error', 'Error adding address', 422));
        });
    });
};
exports.addAddress = addAddress;
