const db = require('../models/setup'); 

//find all tour dates and relevant venue for a user given its id
function findUsersPortfolio() {
	return db.query(`SELECT * FROM users, watchlist WHERE watchlist.user_id = users.id `);
}

//creates a new stock in the "stocks" db 
function create(user_id, symbol, name, price, close) {
	const queryPromise = db.one(`INSERT INTO watchlist (user_id, symbol, name, price, close) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [user_id, symbol, name, price, close]);
	return queryPromise;
}

//queries the db to return a single stock given its id 
function findById(id) {
	return db.oneOrNone(`SELECT * FROM watchlist WHERE id = $1;`, [id]); 
}; 

//updates a stock price in the db given its id
function update(price) {
	// return.db.one(`UPDATE watchlist SET price=$1 WHERE id=$ RETURNING *`, [symbol, name, price, close]); 
}

//destory the stock in the watchlist
function destroy(id) {
	return db.none(`DELETE FROM watchlist WHERE id=$1`, [id]); 
}

module.exports = {findUsersPortfolio, create, findById, update, destroy}; 
