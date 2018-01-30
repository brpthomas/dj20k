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

		})
	}

	
})