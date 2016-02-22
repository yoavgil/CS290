var express = require("express");
var app = express();
var handlebars = require("express-handlebars").create({defaultLayout:"main"});
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.set("port", 3001);

/* Handle incoming POST requests */
app.post("/", function(req, res) {
	//Parse the URL query string
	var qParams = [];
	for (var param in req.query) {
		qParams.push({"name":param, "value":req.query[param]});
	}
	var context = {};
	context.urlData = qParams;

	//Parse the request body
	var bodyParams = [];
	for (var param in req.body) {
		bodyParams.push({"name":param, "value":req.body[param]});
	}
	context.bodyData = bodyParams;
	context.header = "POST Request Received";
	res.render("homepage", context);
});

/* Hand incoming GET requests; parse the query string */
app.get("/", function(req, res) {
	var qParams = [];
	for (var param in req.query) {
		qParams.push({"name":param, "value":req.query[param]});
	}
	var context = {};
	context.urlData = qParams;
	context.header = "GET Request Received";
	res.render("homepage", context);
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