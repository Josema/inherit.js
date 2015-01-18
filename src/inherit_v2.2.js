
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
	p = 'prototype',
	c = 'constructor',
	create = Object.create,
	newbody,
	property,
	newobj,
	convert = function(element, parent) {

		if (typeof element == 'object') {
			newbody = new Function;
			newbody[p] = element;
		}
		else {
			newbody = element;
			if ( !(element[p].hasOwnProperty(c) && element[p][c] !== element ) )
				newbody[p] = new element( parent );
		}

		return newbody;

	},
	merge = function(a, b) {
		
		newobj = create(a);
		for (property in b)
			newobj[property] = b[property];

		return newobj;

	};



	return function() {

		var 
		args = arguments,
		parent = convert( ( args.length == 1 ) ? {} : args[0] ),
		body = convert( args[ args.length-1 ], create(parent[p]) );


		if ( !body[p].hasOwnProperty(c) )
			body[p][c] = new Function;

		body[p][c][p] = merge( parent[p], body[p]);
		body[p][c][p].$super = create(parent[p]);

		if (body[p][c][p][c] !== body[p][c])
			body[p][c][p][c] = body[p][c];

		return body[p][c];
	}



})();