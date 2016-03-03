var express = require("express");
var app = express();
var handlebars = require("express-handlebars").create({defaultLayout:"main"});
var request = require('request');
var credentials = require('./credentials.js');

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.set("port", 3000);

var bestSellersUrl = 'http://api.nytimes.com/svc/books/v3/lists';
var reviewsUrl = 'http://api.nytimes.com/svc/books/v3/reviews';

	//Get names of all the lists you can search for
	//var url = bestSellersUrl + "/names";

app.get("/titles", function (req, res, next) {

	//Get the list of best selles
	var url = bestSellersUrl + "/best-sellers";
	url += "?api-key=" + credentials.nytBooksKey;

	request(url, function (err, response, body) {
		if (!err && response.statusCode < 400) {

			context = {};
			var list = JSON.parse(body);

			titles = [];
			list.results.forEach(function (element) {
				titles.push(element.title);
			});

			context.titles = titles;
			res.render("titles", context);

		} else {
			console.log(err);
			if (response) {
				console.log(response.statusCode);
			}
			next(err);
		}
	});
});


app.use(function(req, res) {
	res.status(404);
	res.render("404");
});

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render("500");
});

app.listen(app.get("port"), function() {
	console.log("Express started on http://localhost:" + app.get("port") + "; press Ctrl-C to terminate.");
});