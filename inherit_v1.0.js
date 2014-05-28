// inherit lite v1.0
/*
   * private vars
   * super
   * constructor
   * instanceof
 */

/*jslint newcap:true */ 
var inherit = function() {
	'use strict';
	var len = arguments.length,
	    parent = (len > 1) ? arguments[0] : function(){},
	    body = arguments[len - 1];

	body.prototype = Object.create(parent.prototype);
	var prototype = new body(body.prototype);
	prototype.constructor.prototype = prototype;
	return prototype.constructor;
};