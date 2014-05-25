// inherit lite v1.0
/*
   * private vars
   * super
   * constructor
   * constructor opcional
   * instanceof
   * inherit objects
   * inherit native functions (not using inherit on the super class)
 */

var inherit = (function() {
	"use strict";

	var getprototype = function(obj) {
		return (typeof obj === "object") ? 
			obj
		:
			((obj.hasOwnProperty('constructor')) ?
				obj.prototype 
			: 
				new obj);
	};

	return function() {

		var len = arguments.length;
		var parent = (len > 1) ? arguments[0] : function(){};
		var bodyelement = arguments[len - 1];
		var parentprototype = getprototype(parent);
		
		if (typeof bodyelement === 'object') {
			var body = function(){};
			body.prototype = bodyelement;
		}
		else {
			var body = bodyelement;
			body.prototype = Object.create(parentprototype);
		}

		var prototype = new body(body.prototype);
		if (prototype.constructor === undefined) prototype.constructor = function(){};
		prototype.constructor.prototype = prototype;
		return prototype.constructor;
	};
})();