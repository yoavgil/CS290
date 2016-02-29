var express = require("express");
var app = express();
var handlebars = require("express-handlebars").create({defaultLayout:"main"});
var bodyParser = require("body-parser");
var session = require("express-session");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.use(session({secret:"superSecretPassword"}));
app.use(express.static("public"));

app.set("port", 3000);

//This function handles GETs
//If there is no session (no value for req.seesion.name), render the newSession page
//If there is a session, render the toDo page
app.get("/", function (req, res) {
	var context = {};
	if (!req.session.name) {
		res.render("newSession", context);
		return;
	}
	context.name = req.session.name;
	context.toDoCount = req.session.toDo.length || 0;
	context.toDo = req.session.toDo || [];
	res.render("toDo", context);
});

//This function handles POSTs
//May be sent by forms on either the newSession page or the toDo page
app.post("/", function (req, res) {
	var context = {};

	//New List button is clicked (on the newSession page)
	if (req.body["New List"]) {
		req.session.name = req.body.name;
		req.session.toDo = [];
		req.session.curId = 0; //used to give each item a unique id
	}

	//If no session, render the newSession page
	if (!req.session.name) {
		res.render("newSession", context);
		return;
	}

	//Add Item button is clicked (on the toDo page)
	if (req.body["Add Item"]) {
		req.session.toDo.push({
			"name":req.body.name,
			"id":req.session.curId++
		});
	}

	//Done button is clicked (on the toDo page)
	//Remove item with matching id from the toDo array
	if (req.body["Done"]) {
		req.session.toDo = req.session.toDo.filter(function (e) {
			return e.id != req.body.id;
		});
	}

	//Render the toDo page
	context.name = req.session.name;
	context.toDoCount = req.session.toDo.length;
	context.toDo = req.session.toDo;
	res.render("toDo", context);
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