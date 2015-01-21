
// inherit v3.0
/*
	* private vars
	* super
	* constructor
	* constructor opcional
	* instanceof
	* inherit objects
 */

Object.prototype.extend = function() {
	var that = (typeof this === "object") ? this : this.prototype,
	argum=arguments, element, property;
	for (element in argum)
		if (argum[element] !== that.extend)
			for (property in argum[element])
				 that[property] = argum[element][property];

	return this;
};

/*jslint newcap:true */ 
var inherit = (function() {
	'use strict';

	var o = 'object',
		p = 'prototype',
		c = 'constructor',
		args,
		parent,
		body_class,
		parent_is_object,
		body,
		new_proto,
		no_has_constructor;

	return function() {

		function newfunction(){}

		args = arguments,
		parent = ( args.length > 1 ) ? args[0] : newfunction,
		body_class = args[ args.length-1 ],
		parent_is_object = typeof parent === o;
		
		if ( typeof body_class === o ) {
			body = newfunction;
			
			body[p] = Object.create( parent[p] );
			body[p].extend( body_class );

			//console.log(body[p])
		}
		else {
			body = body_class;
			body[p] = Object.create( parent[p] );
		}

		new_proto = new body( body[p] );
		no_has_constructor = !new_proto.hasOwnProperty(c);
		if ( (no_has_constructor && parent === new_proto[c]) || (no_has_constructor && parent_is_object) )
			new_proto[c] = newfunction;

		new_proto[c][p] = new_proto;
		return new_proto[c];

	};

})();








var InheritPerson = inherit(function () {
	this.local = "local1";
	this.getlocal1 = function(){
		return this.local + '---';
	};
	this.constructor = function(nome) {
		console.log(1)
		this.nome = nome;
	};
	this.setAddress = function(country, city, street) {
		this.country = country;
		this.city = city;
		this.street = street;
	};
});



/*var InheritPerson = inherit({
	local1: "local1",
	getlocal: function(){
		return this.local + '---';
	},
	constructor: function(nome) {
		console.log(1)
		this.nome = nome;
	},
	setAddress: function(country, city, street) {
		this.country = country;
		this.city = city;
		this.street = street;
	}
});*/

var InheritFrenchGuy = inherit(InheritPerson, {
	local: "local2",
	getlocal: function(){
		return this.local + ' ' + this.getlocal1.call(this) + ',' + '---';
	},
	constructor: function (nome) {
		console.log(2)
		//$super.constructor.call(this, nome);
	},
	setAddress: function(city, street) {
		$super.setAddress.call(this, "France", city, street);
	}
});



var A1 = new InheritPerson("nome1_");
var A2 = new InheritFrenchGuy("nome2_");
console.log(A2.getlocal())

