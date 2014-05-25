// inherit lite v1.0
/*
   * private vars
   * super
   * constructor
   * constructor opcional
   * instanceof
 */

var inherit = function() {
	'use strict';
	var len = arguments.length;
	var parent = (len > 1) ? arguments[0] : function(){};
	var body = arguments[len - 1];

	body.prototype = Object.create(parent.prototype);
	var prototype = new body(body.prototype);
	if (prototype.constructor === undefined) prototype.constructor = function(){};
	prototype.constructor.prototype = prototype;
	return prototype.constructor;
};