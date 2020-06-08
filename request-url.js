var request = require('request');
request('https://swapi.dev/api/people/1/', function(error, response, body) {
	console.log('error:', error); // Print the error if one occurred
	console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	console.log('body:', body); // Print the HTML for the STAR WARS API.
	const luke = JSON.parse(body);
	console.log(luke);

	request(luke.films[0], function(error2, response2, body2) {
		console.log('error#2:', error2);
		console.log('statusCode#2:', response2 && response2.statusCode);
		console.log('body#2:', body2); // Print the HTML of movie
		const film = JSON.parse(body2);
		console.log(film.title);
	});
});