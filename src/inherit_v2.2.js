
// inherit v2.2
// https://github.com/Josenzo/inherit.js
/*
	* private vars
	* super
	* constructor
	* constructor opcional
	* instanceof
	* inherit functions natively
    * inherit functions natively as prototype definitions (Constructor cant be defined as YourClass.prototype.constructor)
    * inherit objects
    * inherit objects natively (no constructor, break the instanceof feature)
 */


/*jslint newcap:true */ 
var inherit = (function() {
	'use strict';


	var 
	o = 'object',
	p = 'prototype',
	c = 'constructor',
	s = '$super',
	create = Object.create,
	newbody,
	property,
	merged,
	convert = function(element, parent) {

		if (typeof element === o) {
			newbody = new Function;
			newbody[p] = element;
		}
		else {
			newbody = element;
			if ( !((element[p].hasOwnProperty(c) && element[p][c] !== element)))
				newbody[p] = new element( parent );
		}

		return newbody;

	},
	merge = function(a, b) {
		
		merged = create(a);
		for (property in b)
			merged[property] = b[property];

		return merged;

	};



	return function() {

		var args = arguments,
			parent = convert( ( args.length == 1 ) ? {} : args[0] ),
			body = convert( args[ args.length-1 ], create(parent[p]) );


		if ( !body[p].hasOwnProperty(c) )
			body[p][c] = new Function;

		body[p][c][p] = merge( parent[p], body[p]);
		body[p][c][p][s] = create(parent[p]);

		if (body[p][c][p][c] !== body[p][c])
			body[p][c][p][c] = body[p][c];

		return body[p][c];
	}



})();