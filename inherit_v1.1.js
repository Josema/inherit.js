// inherit lite v1.0
/*
   * private vars
   * super
   * constructor
   * constructor opcional
   * instanceof
   * inherit objects (inherit objects break the instance of feature)
   * inherit native functions (not using inherit on the super class)
 */

var inherit = (function() {
	'use strict';

	var o = 'object',
		p = 'prototype',
		c = 'constructor',
		getprototype = function(object) {
			return (typeof object === o) ? 
				object
			:
				((object[p].hasOwnProperty(c) && object[p][c] !== object) ?
					object[p] 
				: 
					new object());
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
			body[p] = Object.create(getprototype(parent));
		}

		var prototype = new body(body[p]);
		prototype[c][p] = prototype;
		return prototype[c];
	};
})();


/*
NO COMPRESS:
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