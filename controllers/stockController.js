const User = require('../models/user'); 
const stockAPI = require('../services/stockAPI'); 
const router = require('express').Router();
const passport = require('passport');
const auth = require('../services/auth');
const util = require('util');

const stockData = {}; 

//render the search API and "add a stock" page 
router.get('/new', auth.restrict, (req, res) => {
	res.render('stocks/new', {id: req.user.id});
}); 



//allows for an API search by pulling in all relevant details from the search form as parameters 
router.get('/', auth.restrict, (req, res) => {
	stockAPI 
		.getStockData()
		.then((searchData) => {
			console.log("made it to stockController--stockAPI route", searchData);
			const data = searchData.data; 
			res.render('/new', {searchdata: data})
		})
		.catch((error) => { 
			console.log('error at stockController--stockAPI route', error); 
			res.send(error);

		});
});

module.exports = router;
