import {RequestHandler} from 'express';
import {APIError} from "../../../models/messages";
import {pool} from "../../../database/database";

export const addAddress: RequestHandler = (req, res, next) => {

    const newAddress = {
      line1: req.body.data.line1,
      line2: req.body.data.line2 || null,
      city: req.body.data.city,
      state: req.body.data.state,
      zip: req.body.data.zip,
    }

    pool.connect().then(client => {
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
                })
                client.release()
            })
            .catch(err => {
                console.log('Error: ', err);
                console.log('Error status: ', err.status);
                return next(new APIError('Api Error', 'Error adding address', 422))
            })
    })
};
