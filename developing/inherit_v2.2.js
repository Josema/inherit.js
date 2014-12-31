
// inherit v2.2
// https://github.com/Josenzo/inherit.js
/*
	* private vars
	* super
	* constructor
	* constructor opcional
	* instanceof
 */


/*jslint newcap:true */ 
var inherit = function() {
	'use strict';

	function newfunction(){}

	var o = 'object',
		p = 'prototype',
		c = 'constructor',
		args = arguments,
		parent = ( args.length > 1 ) ? args[0] : newfunction,
		body = args[ args.length-1 ],
		new_proto;


	body[p] = Object.create( parent[p] ),
	new_proto = new body( body[p] );

	if ( !new_proto.hasOwnProperty(c) && parent === new_proto[c] )
		new_proto[c] = newfunction;

	new_proto[c][p] = new_proto;
	return new_proto[c];

};
