
// inherit v2.0
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


	var o = 'object',
		p = 'prototype',
		c = 'constructor',
		s = '$super',
		constructor = new Function,
		create = Object.create,
		new_proto;


	return function() {

		var args = arguments,
			parent = ( args.length > 1 ) ? args[0] : constructor,
			body = args[ args.length-1 ];


		body[p] = ( parent.hasOwnProperty(p) && parent[p].hasOwnProperty(s) ) ? 
			create( parent[p] )
		:
			(typeof parent === o) ?
				create( parent )
			:
				new parent();


		new_proto = (typeof body === o) ? body : new body( body[p] );
		new_proto[s] = body[p];


		if ( !new_proto.hasOwnProperty(c) && parent === new_proto[c] )
			new_proto[c] = constructor;


		new_proto[c][p] = new_proto;
		return new_proto[c];

	}

})();
