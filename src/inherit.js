
/*
 * https://github.com/Josenzo/inherit.js
 * Copyright (c) 2015 Josema Enzo
 * http://opensource.org/licenses/MIT
*/

/*
 * private vars
 * super
 * constructor
 * optional constructor
 * instanceof
 * multi-inherit (breaks the instanceof feature)
 * inherit constructors natively
 * inherit constructors natively as prototype definitions
 * inherit objects
 * inherit objects natively (no constructor, break the instanceof feature)
 */

//http://jsperf.com/performing-inherit-2-2



var inherit = (function() {
	'use strict';


	var
		merged,
		property,
		args,
		parent,
		body,
		p = 'prototype',
		c = 'constructor',
		create = Object.create; // Just an alias


	// Return a new function/constructor with the methods and properties defined in the prototype
	function convert(element, parent) {

		if (typeof element == 'object') {
			body = new Function;
			body[p] = element;
		} else {
			body = element;
			if (!(element[p].hasOwnProperty(c) && element[p][c] !== element))
				body[p] = new element(parent);
		}

		return body;
	}

	// Return a new object with the methods and the properties of both. b has priority over a, if both has the same
	// method the new object will keep the method of b
	function merge(a, b) {

		merged = create(a);
		for (property in b)
			merged[property] = b[property];

		return merged;

	}


	// The function that process the inheritance
	return function inherit_processor( first, second ) {

		args = arguments;

		// If are more of 2 arguments then we apply the process of multiinheritance
		if (args.length > 2) {
			// Remove the first 2 arguments of the arguments and add thoose arguments as merged at the begining
			Array.prototype.splice.call(args, 0, 2, inherit_processor(first, second));
			// Recursion
			return inherit_processor.apply(this, args);
		}

		parent = convert( (args.length == 1) ? {} : first );
		body = convert( args[args.length - 1], create(parent[p]) );

		// This is needed when class does not have defined a constructor
		if ( !body[p].hasOwnProperty(c) )
			body[p][c] = new Function;

		// We parent.prototype and body.prototype into the prototype of the constructor of body
		body[p][c][p] = merge(parent[p], body[p]);

		// Usefull when the element given is an object and does not have $super
		//if (typeof args[args.length - 1] == 'object' || args[args.length - 1][p][c] !== args[args.length - 1])
		body[p][c][p].$super = create(parent[p]);

		// Needed when the element given is an object and does not have any constructor defined.
		// Without this definition when you create a instance the constructor will be the body itself instead of body.prototype.constructor
		//if (body[p][c][p][c] !== body[p][c])
		body[p][c][p][c] = body[p][c];

		return body[p][c];
	};



})();


// node.js
if (typeof module == 'object')
	module.exports = inherit;
