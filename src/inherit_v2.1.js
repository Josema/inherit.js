
// inherit v2.1
// https://github.com/Josenzo/inherit.js
/*
	* private vars
	* super
	* constructor
	* constructor opcional
	* instanceof
	* inherit prototype definitios (constructor does not work well here)
	* inherit classes natively
	* inherit classes natively as prototype definitions
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
		create = Object.create,
		new_proto;


	return function() {

		var args = arguments,
			body = args[ args.length-1 ],
			bodyisobj = typeof body === o,
			body_proto = (typeof body === o) ? undefined : create( body[p] ),
			parent = ( args.length < 2 && (bodyisobj || body[p][c] === body) ) ? 
				new Function
			:
				args[0];


		body[p] = (typeof parent === o) ? 
			create( parent )
		:
			( parent[p].hasOwnProperty(s) )  ?
				create( parent[p] )
			:
				new parent();


		if (bodyisobj)
			new_proto = body;
		else if (body_proto[c] !== body)
			new_proto = body_proto;
		else
			new_proto = new body( body[p] );


		new_proto[s] = body[p];


		if ( !new_proto.hasOwnProperty(c) && parent === new_proto[c] )
			new_proto[c] = new Function;


		new_proto[c][p] = new_proto;
		return new_proto[c];

	}

})();