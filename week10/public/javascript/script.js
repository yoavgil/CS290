document.addEventListener("DOMContentLoaded", function (event) {
	var req = new XMLHttpRequest();
	req.open("POST", "/", true);
	req.addEventListener("load", function() {
		if (req.status >= 200 && req.status < 400) {
			var response = JSON.parse(req.responseText);
			buildTable(response);
		}
	});
	req.send(null);
});

document.getElementById("createEntry").addEventListener("click", function (event) {
	var req = new XMLHttpRequest();
	payload = {
		"createEntry": "createEntry",
		name: document.getElementById("name").value,
		reps: document.getElementById("reps").value,
		weight: document.getElementById("weight").value,
		date: document.getElementById("date").value,
		lbs: document.getElementById("lbs").checked
	};
	
	req.open("POST", "/", true);
	req.setRequestHeader("Content-Type", "application/json");
	req.addEventListener("load", function() {
		if (req.status >= 200 && req.status < 400) {
			var response = JSON.parse(req.responseText);
			buildTable(response);
		}
	});
	req.send(JSON.stringify(payload));
	event.preventDefault();
});

function buildTable(response) {
	var tbody = document.getElementById("tableBody");
	tbody.textContent = "";
	response.forEach(function(entry) {
		var name = document.createElement("td");
		name.textContent = entry.name;
		var reps = document.createElement("td");
		reps.textContent = entry.reps;
		var weight = document.createElement("td");
		weight.textContent = entry.weight;
		var date = document.createElement("td");
		date.textContent = entry.date;
		var lbs = document.createElement("td");
		lbs.textContent = entry.lbs;

		var hidden = document.createElement("input");
		hidden.setAttribute("type", "hidden");
		hidden.setAttribute("name", "id");
		hidden.setAttribute("value", entry.id);

		var edit = document.createElement("input");
		hidden.setAttribute("type", "submit");
		hidden.setAttribute("name", "edit");
		hidden.setAttribute("value", "Edit");

		var del = document.createElement("input");
		hidden.setAttribute("type", "submit");
		hidden.setAttribute("name", "delete");
		hidden.setAttribute("value", "Delete");

		var tableForm = document.createElement("form");
		tableForm.appendChild(hidden);
		tableForm.appendChild(edit);
		tableForm.appendChild(del);
		var tableButtons = document.createElement("td");
		tableButtons.appendChild(tableForm);

		var row = document.createElement("tr");
		row.appendChild(name);
		row.appendChild(reps);
		row.appendChild(weight);
		row.appendChild(date);
		row.appendChild(lbs);
		row.appendChild(tableButtons);

		tbody.appendChild(row);
	});
}

/*
document.getElementByClass("delete").addEventListener("click", function (event) {

});
*/