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

app.get("/all-lists", function (req, res, next) {
	
	//Get names of all the lists you can search for
	var url = bestSellersUrl + "/names";
	url += "?api-key=" + credentials.nytBooksKey;

	request(url, function (err, response, body) {
		if (!err && response.statusCode < 400) {
			//This code just displays the response body
			context = {};
			context.data = body;
			res.render("data", context);
		} else {
			console.log(err);
			if (response) {
				console.log(response.statusCode);
			}
			next(err);
		}
	});
});

app.get("/fiction", function (req, res, next) {

	//Get info for list named hardcover-fiction
	var url = bestSellersUrl + "/hardcover-fiction";
	url += "?api-key=" + credentials.nytBooksKey;

	request(url, function (err, response, body) {
		if (!err && response.statusCode < 400) {
			//This code just displays the response body
			context = {};
			context.data = JSON.stringify(JSON.parse(body)); //removes escaped characters
			res.render("data", context);
		} else {
			console.log(err);
			if (response) {
				console.log(response.statusCode);
			}
			next(err);
		}
	});
});


app.get("/history", function (req, res, next) {

	//Get info for current best sellers lists
	var url = bestSellersUrl + "/best-sellers/history";
	url += "?isbn=9781476746586";
	url += "&api-key=" + credentials.nytBooksKey;

	request(url, function (err, response, body) {
		if (!err && response.statusCode < 400) {
			//This code just displays the response body
			context = {};
			context.data = body; //removes escaped characters
			res.render("data", context);
		} else {
			console.log(err);
			if (response) {
				console.log(response.statusCode);
			}
			next(err);
		}
	});
});


app.get("/reviews", function (req, res, next) {

	//Get info for current best sellers lists
	var url = reviewsUrl;
	url += "?isbn=9781476746586";
	url += "&api-key=" + credentials.nytBooksKey;

	request(url, function (err, response, body) {
		if (!err && response.statusCode < 400) {
			//This code just displays the response body
			context = {};
			context.data = body; //removes escaped characters
			res.render("data", context);
		} else {
			console.log(err);
			if (response) {
				console.log(response.statusCode);
			}
			next(err);
		}
	});
});


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