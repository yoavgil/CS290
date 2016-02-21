// Create a table
var table = document.createElement("table");

// Create and append the table's header row
var tableHead = document.createElement("thead");
var headRow = document.createElement("tr");
tableHead.appendChild(headRow);
for (var i = 0; i < 4; i++) {
	headCell = document.createElement("th");
	headCell.textContent = "Header " + (i + 1);
	headRow.appendChild(headCell);
}
table.appendChild(tableHead);

// Create and append the table's data rows
var tableBody = document.createElement("tbody");
for (var i = 0; i < 3; i++) {
	var tableRow = document.createElement("tr");
	for (var j = 0; j < 4; j++) {
		var dataCell = document.createElement("td");
		dataCell.textContent = (j + 1) + ", " + (i + 1);
		tableRow.appendChild(dataCell);
	}
	tableBody.appendChild(tableRow);
}
table.appendChild(tableBody);

// Create 5 buttons
var upButton = document.createElement("button");
upButton.textContent = "up";
var downButton = document.createElement("button");
downButton.textContent = "down";
var leftButton = document.createElement("button");
leftButton.textContent = "left";
var rightButton = document.createElement("button");
rightButton.textContent = "right";
var markCellButton = document.createElement("button");
markCellButton.textContent = "Mark Cell";

// Append the table and 5 buttons to the document body
document.body.appendChild(table);
document.body.appendChild(upButton);
document.body.appendChild(downButton);
document.body.appendChild(leftButton);
document.body.appendChild(rightButton);
document.body.appendChild(markCellButton);

// Keep track of the currently selected cell, and give it a thick border
var curX = 1;
var curY = 1;
var currentCell = table.children[1].children[curY - 1].children[curX - 1];
updateCells();

// If able, moves the currently selected cell up by one cell
upButton.addEventListener("click", function(event) {
	if (curY > 1) {
		curY--;
		updateCells();
	}
});

// If able, moves the currently selected cell down by one cell
downButton.addEventListener("click", function(event) {
	if (curY < 3) {
		curY++;
		updateCells();
	}
});

// If able, moves the currently selected cell left by one cell
leftButton.addEventListener("click", function(event) {
	if (curX > 1) {
		curX--;
		updateCells();
	}
});

// If able, moves the currently selected cell right by one cell
rightButton.addEventListener("click", function(event) {
	if (curX < 4) {
		curX++;
		updateCells();
	}
});

// Makes the current cell return to having a thin border
// Then uses curX and curY to update current cell, and give it a thick border
function updateCells() {
	currentCell.style.borderWidth = "thin";
	currentCell = table.children[1].children[curY - 1].children[curX - 1];
	currentCell.style.borderWidth = "thick";
}

// Gives the current cell a yellow background
markCellButton.addEventListener("click", function(event) {
	currentCell.style.backgroundColor = "yellow";
});