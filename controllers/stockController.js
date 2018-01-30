const User = require('../models/users'); 
const stockAPI = require('../services/stockAPI'); 
const router = require('express').Router();
const passport = require('passport');
const auth = require('../services/auth');
const util = require('util');

const stockData = {}; 

//render the "add a stock" page 
router.get('/new', auth.restrict, (req, res) => {
	res.render('stocks/new', {id: req.user.id});
}); 

//render the search results page
router.get('/search', auth.restrict,(res, req) => {
	res.render('stocks/search', stockData)
});

//allows for an API search by pulling in all relevant details from the search form as parameters 
router.get('/search/')