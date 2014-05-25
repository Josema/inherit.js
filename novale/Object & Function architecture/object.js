//http://aaditmshah.github.io/why-prototypal-inheritance-matters/









/*Object.extend = function () {
	var hasOwnProperty = Object.hasOwnProperty;
	var object = Object.create(arguments[0]);
	var length = arguments.length;
	var index = 1;

	while (index<length) {
		var extension = arguments[index++];

		for (var property in extension)
			if (property !== "clones" &&
				hasOwnProperty.call(extension, property) ||
				typeof object[property] === "undefined")
					object[property] = extension[property];

		if (hasOwnProperty.call(extension, "clones"))
			extension.clones.unshift(object);
		else extension.clones = [object];
	}

	return object;
};
Object.instanceof = function (parent, prototype) {
	if (Object.hasOwnProperty.call(prototype, "clones"))
		var clones = prototype.clones;
	var object = parent;

	do {
		if (object === prototype ||
			clones && clones.indexOf(object) >= 0)
				return true;

		var object = Object.getPrototypeOf(object);
	} while (object);

	return false;
};
Object.define = function (prototype, property, value) {
	prototype[property] = value;

	if (Object.hasOwnProperty.call(prototype, "clones")) {
		var clones = prototype.clones;
		var length = clones.length;

		while (length) {
			var clone = clones[--length];
			if (typeof clone[property] === "undefined")
				Object.define(clone, property, value);
		}
	}
};*/











Object.class = function(object) {
	object.extend = Object.extend;
	object.instanceof = Object.instanceof;
	object.define = Object.define;
	return object;
};

Object.extend = function () {
	var hasOwnProperty = Object.hasOwnProperty;
	var object = Object.create(this);
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
	
	return object;
};

Object.instanceof = function (prototype) { //Object.instanceof.call(A, B)


	if (Object.hasOwnProperty.call(prototype, "clones"))
		var clones = prototype.clones;
	var object = this;

	do {
		if (object === prototype ||
			clones && clones.indexOf(object) >= 0)
				return true;

		var object = Object.getPrototypeOf(object);
	} while (object);

	return false;
};

Object.define = function (property, value) {
	this[property] = value;

	if (Object.hasOwnProperty.call(this, "clones")) {
		var clones = this.clones;
		var length = clones.length;

		while (length) {
			var clone = clones[--length];
			if (typeof clone[property] === "undefined")
				clone.define(property, value);
		}
	}
};

