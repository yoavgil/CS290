var express = require("express");
var app = express();
var handlebars = require("express-handlebars").create({defaultLayout:"main"});
var request = require("request");
var credentials = require("./credentials.js");

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.use(express.static("public"));
app.set("port", 3000);

//This function uses a request call, prints response body to console
app.get("/", function(req, res) {
	request("http://www.google.com", function (err, response, body) {
		if (!err && response.statusCode < 400) {
			console.log(body); //This shows the HTML code for google.com in the console
		} else {
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