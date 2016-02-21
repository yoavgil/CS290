var express = require("express");

var app = express();
var handlebars = require("express-handlebars").create({defaultLayout:"main"});

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", 3000);

/*app.post("/", function(req, res) {

});*/

app.get("/", function(req, res) {
	var qParams = [];
	for (var param in req.query) {
		qParams.push({"name":param, "value":req.query[param]});
	}
	var context = {};
	context.dataList = qParams;
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