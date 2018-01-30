$(document).ready(function() {
	console.log('jquery is running! from public/script.js');

	//function to make the search query work

	$('#search').on('submit', (e) => {
		e.preventDefault(); 
		const searchData = $('#search-input').val(); 
		console.log(searchData);
		makeSearchCall(searchData);
	});

	const makeSearchCall = (name) => {
		$.ajax({
			type: 'GET', 
			url: `http://marketdata.websol.barchart.com/getQuote.json?key=4bfdb2da99476a86a66cae1eef9b6aaa&symbols=${name}`,
			success: data => {
				getData(data); 
			}

		});
		const getData = (data) => {
		const $symbol = $('.symbol');
        const $name = $('.companyName');
        const $price = $('.openPrice');
        const $close = $('.previousPrice')
        console.log(data.results[0].symbol);
        console.log(data.results[0].name);
        console.log(data.results[0].open);
        console.log(data.results[0].lastPrice);
        const $addTicker = $('<h3>').text(data.results[0].symbol).addClass('symbolname').appendTo($symbol);
        const $addName = $('<h3>').text(data.results[0].name).addClass('companyname').appendTo($name);
        const $addOpenPrice = $('<h3>').text(data.results[0].open).addClass('currentprice').appendTo($price);
        const $addLastPrice = $('<h3>').text(data.results[0].lastPrice).addClass('closingprice').appendTo($close);
        console.log(data.results[0].name);
	};
	};
	//function to create a stock in the watchlist table 
	console.log('cold feet in this bitch to start');

	//jquery on submit function to add button
	$('add-to-watchlist').on('submit', (e) => {
		e.preventDefault(); 
		const stock = symbol = $('.symbol').val(),
		name = $('.companyName').val(), 
		opening = $('.openPrice').val(), 
		previousClose = $('.previousPrice').val();

		const newStock = {
			symbol: symbol, 
			name: name,
			price: opening,
			close: previousClose

		}
		console.log(newStock);

		$.ajax({
			method: "POST", 
			url: '/stocks/',
			data: newStock, 
			success: response => {
				window.location.replace('/stocks/' + response.id)
			}, 
			error: msg => {
				console.log(msg);
			}
		});




	}); 
	
})// end of jquery