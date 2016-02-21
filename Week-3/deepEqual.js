/* This function returns true only if the two values are equal,
 * or are objects with identical properties whose values are also equal
 */
function deepEqual(x, y) {
	// Check if both arguments are objects
	if ((typeof x == "object" && x != null) &&
	    (typeof y == "object" && y != null)) {
		
		// Compare number of properties
		if (Object.keys(x).length != Object.keys(y).length) return false;

		// Compare individual properties
		var sameKey;  // Checks if the same property is found in both objects
		for (var i in x) {
			sameKey = false;
			for (var j in y) {
				if (i == j) {  // same property
					sameKey = true;
					if (deepEqual(x[i], y[j]) == false) return false;
				}
			}
			if (sameKey == false) return false;
		}
		return true;
	}

	// Otherwise, compare by identity
	else {
		return x === y;
	}
}


/* The following test code is from Eloquent JavaScript chapter 4 */
var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true