import {RequestHandler} from "express";
import {APIError} from "../../../models/messages";
import {pool} from "../../../database/database";

export const addressValidate: RequestHandler = (req, res, next) => {
    const requiredFields = ['line1', 'city', 'state', 'zip'];
    const givenFields = Object.getOwnPropertyNames(req.body.data);

    if (!requiredFields.every(field => givenFields.includes(field))) {
        return next(new APIError('Missing Data', 'Post request is missing data', 400))
    }

    const address = {
        line1: req.body.data.line1,
        line2: req.body.data.line2 || null,
        city: req.body.data.city,
        state: req.body.data.state,
        zip: req.body.data.zip,
    }

    pool.connect().then(client => {
        client.query('SELECT * FROM addresses WHERE line1 = $1 AND line2 = $2 AND city = $3 AND state = $4 AND zip = $5', [
            address.line1,
            address.line2,
            address.city,
            address.state,
            address.zip
        ])
        .then(result => {
            console.log('Row COunt: ', result.rowCount);
            if (result.rowCount > 0) {
                throw new Error(
                    new APIError('Duplicate', 'Address already exists', 400)
                        .toString()
                );
            } else {
                next()
            }

        }).catch(err => {
            console.log('Error: ', err);
            return next(new APIError('Api Error', err.message, 422))
        })
    })
}
