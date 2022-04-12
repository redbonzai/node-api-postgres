import {RequestHandler} from 'express';
import {APIError} from "../../../models/messages";
import {pool} from "../../../database/database";

export const updateAddress: RequestHandler = (
    req,
    res, next
) => {
    const newAddress = {
        line1: req.body.data.line1,
        line2: req.body.data.line2 || null,
        city: req.body.data.city,
        state: req.body.data.state,
        zip: req.body.data.zip,
    }

    pool.connect().then(client => {
        client.query('UPDATE addresses SET line1=$1, line2=$2, city=$3, state=$4, zip=$5 WHERE id=$6',
            [newAddress.line1, newAddress.line2, newAddress.city, newAddress.state, newAddress.zip, req.params.id]
        )
            .then(result => {
                client.release();
                res.status(200).json({
                    message: 'Address updated successfully',
                    data: newAddress
                })
            })
            .catch(err => {
                client.release();
                console.log(err.stack)
                return next(new APIError('Api Error', 'Error adding address', 422))
            })
    })
}
