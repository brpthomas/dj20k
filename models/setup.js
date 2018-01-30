const pgp = require('pg-promise')();

// this is another way of doing it
var db = pgp(process.env.DATABASE_URL || 'postgres://superbadpeter@localhost:5432/starwars_stocks');

// const db = pgp ({
// 	host: 'localhost',
// 	port: 5432, 
// 	database: 'starwars_stocks'
// }); 


module.exports = db;