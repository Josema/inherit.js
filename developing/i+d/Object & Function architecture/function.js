//http://aaditmshah.github.io/why-prototypal-inheritance-matters/


Function.prototype.extend = function () {
	var hasOwnProperty = Object.hasOwnProperty;
	var object = Object.create(this.prototype);
	var length = arguments.length;
	var index = length;

	while (index) {
		var extension = arguments[length - (index--)];

		for (var property in extension)
			if (property !== "clones" &&
				hasOwnProperty.call(extension, property) ||
				typeof object[property] === "undefined")
					object[property] = extension[property];


		if (hasOwnProperty.call(extension, "clones"))
			extension.clones.unshift(object);
		else extension.clones = [object];
	}
	
	var body = (hasOwnProperty.call(object, "constructor")) ? object.constructor : function(){};
	body.prototype = object;
	return body;
};


