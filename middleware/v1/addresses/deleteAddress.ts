import {RequestHandler} from 'express';
import {pool} from "../../../database/database";

export const deleteAddress: RequestHandler = (req, res, next) => {
    pool.connect().then(client => {
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
