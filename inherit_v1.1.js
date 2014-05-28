// inherit lite v1.1
/*
   * private vars
   * super
   * constructor
   * instanceof
   * inherit objects (inherit objects break the instanceof feature)
   * inherit native functions (not working methods and properties declared on the prototype)
 */


/*jslint newcap:true */ 
var inherit = (function() {
	'use strict';

	var o = 'object',
	    p = 'prototype',
	    c = 'constructor',
	    getprototype = function(objfun) {
	    	return (typeof objfun === o) ? 
	    		objfun
	    	:
	    		((Object.getOwnPropertyNames(objfun[p]).length > 1) ?
	    			Object.create(objfun[p])
	    		: 
	    			new objfun());
	    };

	return function() {

		var len = arguments.length,
			parent = (len > 1) ? arguments[0] : function(){},
			bodyelement = arguments[len - 1],
			body;

		if (typeof bodyelement === o) {
			body = function(){};
			body[p] = bodyelement;
		}
		else {
			body = bodyelement;
			body[p] = getprototype(parent);
		}

		var prototype = new body(body[p]);
		prototype[c][p] = prototype;
		return prototype[c];
	};
})();


/*
NO COMPRESSED:
var inherit = (function() {
	'use strict';

	var getprototype = function(obj) {
		return (typeof obj === 'object') ? 
			obj
		:
			((obj.prototype.hasOwnProperty('constructor') && obj.prototype.constructor !== obj) ?
				obj.prototype 
			: 
				new obj());
	};

	return function() {

		var len = arguments.length,
			parent = (len > 1) ? arguments[0] : function(){},
			bodyelement = arguments[len - 1];

		if (typeof bodyelement === 'object') {
			var body = function(){};
			body.prototype = bodyelement;
		}
		else {
			var body = bodyelement;
			body.prototype = Object.create(getprototype(parent));
		}

		var prototype = new body(body.prototype);
		prototype.constructor.prototype = prototype;
		return prototype.constructor;
	};
})();
*/