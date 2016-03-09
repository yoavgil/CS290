var express = require("express");
var app = express();
var handlebars = require("express-handlebars").create({defaultLayout:"main"});

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.use(express.static("public"));

app.set("port", 3000);

/* Serve the requested page */

app.get("/page1", function (req, res, next) {
	res.sendFile(__dirname + "/public/html/page1.html");
});

app.get("/page2", function (req, res, next) {
	res.sendFile(__dirname + "/public/html/page2.html");
});

app.get("/page3", function (req, res, next) {
	res.sendFile(__dirname + "/public/html/page3.html");
});

app.get("/page4", function (req, res, next) {
	res.sendFile(__dirname + "/public/html/page4.html");
});

app.get("/page5", function (req, res, next) {
	res.sendFile(__dirname + "/public/html/page5.html");
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