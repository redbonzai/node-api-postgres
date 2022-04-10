"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const database_1 = require("./database/database");
const v1Router_1 = require("./middleware/v1/v1Router");
const server = (0, express_1.default)();
const port = parseInt(process.env.SERVER_PORT || '4200');
server.disable('x-powered-by');
server.use('/v1', v1Router_1.v1Router);
database_1.pool.on('connect', () => {
    console.log('connected to the database');
});
// pool.query('select * from addresses', (err, res) => {
//     if (err) throw err;
//     console.log(res.rows);
// });
server.listen(port, () => console.log(`Server listening on port ${port}`));
