var express = require("express");
var app = express();
var handlebars = require("express-handlebars").create({defaultLayout:"main"});
var bodyParser = require("body-parser");
var mysql = require("mysql");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.set("port", 3000);

var pool = mysql.createPool({
	host: "localhost",
	user: "student",
	password: "default",
	database: "student"
});

//Handler to setup database table
//This was given with the assignment
app.get('/reset-table',function(req,res,next){
	var context = {};
	pool.query("DROP TABLE IF EXISTS workouts", function(err){
		var createString = "CREATE TABLE workouts("+
		"id INT PRIMARY KEY AUTO_INCREMENT,"+
		"name VARCHAR(255) NOT NULL,"+
		"reps INT,"+
		"weight INT,"+
		"date DATE,"+
		"lbs BOOLEAN)";
		pool.query(createString, function(err){
			context.results = "Table reset";
			res.render('home',context);
		});
	});
});


app.get("/", function (req, res, next) {
	var context = {};
	pool.query("SELECT * FROM workouts", function (err, rows, fields) {
		if (err) {
			next(err);
			return;
		}
		context.results = rows;
	});
	res.render("workoutTracker", context);
});


app.post("/", function (req, res, next) {
	var context = {};

	if (req.body["createEntry"]) {
		pool.query("INSERT INTO workouts (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?, ?, ?, ?, ?)", [req.body.name], [req.body.reps], [req.body.weight], [req.body.date], [req.body.lbs], function (err, result) {
			if (err) {
				next(err);
				return;
			}
		});
	}

	pool.query("SELECT * FROM workouts", function (err, rows, fields) {
		if (err) {
			next(err);
			return;
		}
		context.results = rows;
	});
	res.render("workoutTracker", context);
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