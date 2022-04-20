import {RequestHandler} from "express";
import {pool} from "../../../database/database";
import {APIError} from "../../../models/messages";
import {AddressSummary} from "../../../models/shared/AddressSummary";

export const addressById: RequestHandler = (req, res, next) => {
    pool.connect().then(client => {
        client.query('SELECT * FROM addresses WHERE id = $1', [req.params.id])
            .then(result => {
                if (result.rows.length === 0) {
                    throw new Error('Address not found');
                }
                return res.status(200).json({
                    data: result.rows.map((item: any) => new AddressSummary(item))
                })
            })
            .catch(err => {
                client.release();
                console.log(err.stack)
                return next(new APIError('Api Error', err.message, 422))
            })
    }).catch(err => {
        console.log(err.stack)
        return next(new APIError('Api Connection Error', err.message, 422))
    })
};
