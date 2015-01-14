testring = [
'nome1_nome2_nome2B_nome3_',
'nome1_Nam2changed_nome2B_nome3_',
'local1--- local2 local1,local1------ local2 local1,local1------ local3 local2,local2 local1,local1---------',
'local1_changed--- local2_changed local1,local1------ local2b_changed local1,local1------ local3_changed local2,local2 local1,local1---------',
'local1_changed--- local2_changed local1,local1------ local2b_changed local1,local1------ local3_changed LOCAL2FROMCHILD_,LOCAL2FROMCHILD_ local1,local1---------',
'local2 local1,local1------',
'France Paris Street3,',
'France Paris Street3,France City2 Street2',
'France Paris Street3,France City2 Street2,Country1 City1 Street1'
]



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








console.log("==============")
console.log("1")
console.log("==============")
var InheritPerson = inherit(function () {
	this.local = "local1";
	this.getlocal = function(){
		return this.local + '---';
	};
	this.constructor = function(nome) {
		this.nome = nome;
	};
	this.setAddress = function(country, city, street) {
		this.country = country;
		this.city = city;
		this.street = street;
	};
	console.log(1)
});
var InheritFrenchGuy = inherit(InheritPerson, function($super) {
	this.local = "local2";
	this.getlocal = function(){
		return this.local + ' ' + $super.local + ',' + $super.getlocal() + '---';
	};
	this.constructor = function (nome) {
		//console.log( $super.constructor===this.$super.constructor)
		$super.constructor.call(this, nome);

	};
	this.change = function(){
	   $super.local = "LOCAL2FROMCHILD_"
	};
	this.setAddress = function(city, street) {
		$super.setAddress.call(this, "France", city, street);
	};
	console.log(2)
});

var InheritParisLover = inherit(InheritFrenchGuy, function($super) {
	this.local = "local3";
	this.getlocal = function(){
		return this.local + ' ' + $super.local + ',' + $super.getlocal() + '---';
	};
	this.change = function(){
		$super.local = "LOCAL2FROMCHILD_"
	};
	this.constructor= function (nome) {
		$super.constructor.call(this, nome);
	};
	this.setAddress = function(street) {
		$super.setAddress.call(this, "Paris", street);
	};
	console.log(3)
});




var A1 = new InheritPerson("nome1_");
var A2 = new InheritFrenchGuy("nome2_");
var A2b = new InheritFrenchGuy("nome2B_");
var A3 = new InheritParisLover("nome3_");

console.log(1.1, A1.nome + A2.nome + A2b.nome + A3.nome == testring[0])
A2.nome = "Nam2changed_";
console.log(1.2, A1.nome + A2.nome + A2b.nome + A3.nome == testring[1])

console.log(2.1, A1.getlocal() +' '+ A2.getlocal() +' '+ A2b.getlocal() +' '+ A3.getlocal() == testring[2])
A1.local = "local1_changed";
A2.local = "local2_changed";
A2b.local = "local2b_changed";
A3.local = "local3_changed";
console.log(2.2, A1.getlocal() +' '+ A2.getlocal() +' '+ A2b.getlocal() +' '+ A3.getlocal() == testring[3])

A3.change();
console.log(3.1, A1.getlocal() +' '+ A2.getlocal() +' '+ A2b.getlocal() +' '+ A3.getlocal() == testring[4])
var A2c = new InheritFrenchGuy("nome2B_");
console.log(3.2, A2c.getlocal() == testring[5])

A3.setAddress("Street3");
console.log(4.1, A3.country + ' ' + A3.city + ' ' + A3.street + ',' == testring[6])
A2.setAddress("City2", "Street2");
console.log(4.2, A3.country + ' ' + A3.city + ' ' + A3.street + ',' + A2.country + ' ' + A2.city + ' ' + A2.street == testring[7])
A1.setAddress("Country1", "City1", "Street1");
console.log(4.3, A3.country + ' ' + A3.city + ' ' + A3.street + ',' + A2.country + ' ' + A2.city + ' ' + A2.street + ',' + A1.country + ' ' + A1.city + ' ' + A1.street == testring[8])

console.log(5.1, (A1 instanceof InheritPerson)+' '+ (A1 instanceof InheritFrenchGuy) +' '+ (A1 instanceof InheritParisLover))
console.log(5.2, (A2 instanceof InheritPerson)+' '+ (A2 instanceof InheritFrenchGuy) +' '+ (A2 instanceof InheritParisLover))
console.log(5.3, (A3 instanceof InheritPerson)+' '+ (A3 instanceof InheritFrenchGuy) +' '+ (A3 instanceof InheritParisLover))








