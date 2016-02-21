console.log("5 factorial equals " + myfactorial(5));

/* When run, the following line results in an error: mycube is not a function */
//console.log("5 cubed equals " + mycube(5));

function myfactorial(x) {
	var result = 1;
	for (var i = 2; i <= x; i++) {
		result *= i;
	}
	return result;
}

var mycube = function(x) {
	return x * x * x;
}

/* The same line runs successfully after the function definition */
console.log("5 cubed equals " + mycube(5));