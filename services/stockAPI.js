const axios = require('axios'); 
const key = process.env.alpha_api_key;

//perform the API call using the stock symbol input by the user

function getStockData(ticker) {
	const queryPromise = axios ({
		url: `http://marketdata.websol.barchart.com/getQuote.json?key=4bfdb2da99476a86a66cae1eef9b6aaa&symbols=${ticker}`,
		method: 'GET',
	})
	return queryPromise;
}


//using another method using ES6 and pg promises to do an API call

// const getStockData = (ticker) => {
// 	return axios.get(`http://marketdata.websol.barchart.com/getQuote.json?key=4bfdb2da99476a86a66cae1eef9b6aaa&symbols=${ticker}`)
// 		.then((response) => {
// 			return response
// 			console.log(response)
// 		})
// 		.catch((error) => {
// 			console.log(error + "from stock API in services!");
// 		});
// }

module.exports = {getStockData}; 