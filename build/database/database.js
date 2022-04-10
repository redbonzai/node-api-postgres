"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const port = parseInt(process.env.PORT || '5432');
exports.pool = new pg_1.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
    port: port
});
// pool.connect().then(client => {
//     client.query('SELECT * FROM addresses', (err, res) => {
//         console.log(err, res)
//         client.release()
//     })
// })
