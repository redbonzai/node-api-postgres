import { RequestHandler} from 'express';
import { pool } from '../../../database/database';
import {AddressFilters} from "../../../models/shared/AddressFilters";
import {AddressSummary} from "../../../models/shared/AddressSummary";
import {APIError} from "../../../models/messages";

export const getAddresses: RequestHandler = (req, res, next) => {
  pool.connect().then(client => {
      const filters = new AddressFilters(req.query).getCondition();
      let conditions = filters === ''
          ? ''
          : 'WHERE ' + filters + 'ORDER BY id ASC';

    client.query('SELECT * FROM addresses ' + conditions)
      .then(result => {
        res.status(200).json({
            data: result.rows.map((item: any) => new AddressSummary(item))
        });
        client.release();
      })
      .catch(e => {
        console.error(e.stack);
        next(new APIError('Not Found', 'Error retrieving addresses', 400))
      });
  });
};
