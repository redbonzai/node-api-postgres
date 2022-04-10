"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAddresses = void 0;
const database_1 = require("../../../database/database");
const AddressFilters_1 = require("../../../models/shared/AddressFilters");
const AddressSummary_1 = require("../../../models/shared/AddressSummary");
const messages_1 = require("../../../models/messages");
const getAddresses = (req, res, next) => {
    database_1.pool.connect().then(client => {
        const filters = new AddressFilters_1.AddressFilters(req.query).getCondition();
        let conditions = filters === ''
            ? ''
            : 'WHERE ' + filters + 'ORDER BY id ASC';
        client.query('SELECT * FROM addresses ' + conditions)
            .then(result => {
            res.status(200).json({
                data: result.rows.map((item) => new AddressSummary_1.AddressSummary(item))
            });
            client.release();
        })
            .catch(e => {
            console.error(e.stack);
            next(new messages_1.APIError('Not Found', 'Error retrieving addresses', 400));
        });
    });
};
exports.getAddresses = getAddresses;
