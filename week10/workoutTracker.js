var express = require("express");
var app = express();
var handlebars = require("express-handlebars").create({defaultLayout:"main"});
var bodyParser = require("body-parser");
var mysql = require("mysql");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.use(express.static("public"));

app.set("port", 3000);

var pool = mysql.createPool({
	host: "localhost",
	user: "student",
	password: "default",
	database: "student"
});

//Handler to setup database table
//This function was given with the assignment
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

//GET handler (used to display the page)
app.get("/", function (req, res, next) {
	res.render("workoutTracker");
});

//POST handler (used to handle AJAX requests and send responses)
app.post("/", function (req, res, next) {
	var context = {};

	//Creates new entry in database using form data
	if (req.body["createEntry"]) {
		pool.query("INSERT INTO workouts (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?, ?, ?, ?, ?)", [req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.lbs], function (err, result) {
			if (err) {
				next(err);
				return;
			}
			//Selects the table from the database
			pool.query("SELECT * FROM workouts", function (err, rows, fields) {
				if (err) {
					next(err);
					return;
				}
				res.type("text/plain");
				res.send(JSON.stringify(rows));
			});
		});
		return; //prevents server from sending data below
	}

	//Takes user to new page to edit the selected row
	if (req.body["edit"]) {		
		var context = {};
		pool.query("SELECT * FROM workouts WHERE id=?", req.body.id, function (err, rows, fields) {
			if (err) {
				next(err);
				return;
			}
			if (rows.length == 1) {
				context.id = req.body.id;
				context.name = rows[0].name;
				context.reps = rows[0].reps;
				context.weight = rows[0].weight;
				context.date = (JSON.stringify(rows[0].date)).substring(1, 11);
				if (rows[0].lbs) {
					context.lbsChecked = "checked";
				} else {
					context.kgChecked = "checked";
				}
			}
			res.render("editRow", context);
		});
		return; //prevents server from sending data below
	}

	if (req.body["save"]) {
		pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=?", [req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.lbs, req.body.id], function (err, result) {
			if (err) {
				next(err);
				return;
			}
		});
		res.render("workoutTracker");
		return; //prevents server from sending data below
	}

	if (req.body["cancel"]) {
		res.render("workoutTracker");
		return; //prevents server from sending data below
	}

	//Deletes the row from the database
	if (req.body["delete"]) {
		pool.query("DELETE FROM workouts WHERE id=?", req.body.id, function (err, result) {
			if (err) {
				next(err);
				return;
			}
			//Selects the table from the database
			pool.query("SELECT * FROM workouts", function (err, rows, fields) {
				if (err) {
					next(err);
					return;
				}
				res.type("text/plain");
				res.send(JSON.stringify(rows));
			});
		});
		return; //prevents server from sending data below
	}

	//Selects the table from the database
	pool.query("SELECT * FROM workouts", function (err, rows, fields) {
		if (err) {
			next(err);
			return;
		}
		res.type("text/plain");
		res.send(JSON.stringify(rows));
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