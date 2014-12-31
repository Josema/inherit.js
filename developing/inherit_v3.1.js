
// inherit v3.1
/*
	* private vars
	* super
	* constructor
	* constructor opcional
	* instanceof
	* inherit objects (inherit objects directly breaks the instanceof feature)
	* inherit native functions
	* inherit native functions as prototype definitions
	* multihinheritance (instanceof feature does not work with multihinheritance)
	* super all
 */


/*jslint newcap:true */ 
var inherit = (function() {
	'use strict';

	var createconstructor = function(objfun) {
		return (typeof objfun === 'object') ? Object.create(objfun) : new objfun();
	};

	return function() {

		var o = 'object',
			p = 'prototype',
			c = 'constructor',
			newfunction = function(){},
			args = arguments,
			parent = args[0],
			bodyclass = (args.length == 1) ? newfunction : args[args.length-1],
			parentisobject = typeof parent === o,
			body,
			newproto,
			hasconstructor;

		if (typeof bodyclass === o) {
			body = newfunction;
			body[p] = bodyclass;
		}
		else {
			body = bodyclass;
			body[p] = createconstructor(parent);
		}


		var superall = [body[p]];
		for (var i=1; i<args.length-1; ++i)
			superall.push(createconstructor(args[i]));

		newproto = new body(body[p], superall);
		hasconstructor = !newproto.hasOwnProperty(c);
		if ( (hasconstructor && parent === newproto[c]) || (hasconstructor && parentisobject) )
			newproto[c] = newfunction;

		newproto[c][p] = newproto;

		for (var i=1; i<superall.length; ++i)
			for (var property in superall[i])
				if (property !== c)
					newproto[c][p][property] = superall[i][property];

		return newproto[c];

	}

})();



