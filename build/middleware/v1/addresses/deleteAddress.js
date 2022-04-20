"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddress = void 0;
const database_1 = require("../../../database/database");
const deleteAddress = (req, res, next) => {
    database_1.pool.connect().then(client => {
        client.query('DELETE FROM addresses WHERE id = $1', [req.params.id])
            .then(result => {
            res.status(200).json({
                message: 'Address deleted successfully'
            });
        })
            .catch(err => {
            res.status(400).json({
                error: err
            });
        })
            .finally(() => {
            client.release();
        });
    });
};
exports.deleteAddress = deleteAddress;
