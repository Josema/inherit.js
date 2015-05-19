## Install

For node.js

```shell
npm install inheritjs
```


For browsers

```html
<script src="https://raw.githubusercontent.com/Josenzo/inherit.js/master/src/inherit.min.js"></script>
```





## Simple usage

```javascript
var inherit = require('inheritjs');

var Person = inherit(function(){
	this.canSpeak = function() {
		return true;
	};
});

var Men = inherit(Person, function(){
	this.hasPenis = function() {
		return true;
	};
});

var me = new Men();
console.log( me.canSpeak(), me.hasPenis() ); // true true
```



## Features

  - [Constructor](#constructor)
  - [Super](#super)
  - [Private var's](#private-vars)
  - [instanceof](#instanceof)
  - [Inherit Objects](#inherit-objects)
  - [Multi-inherit](#multi-inherit)
  - [Inherit constructor natively](#inherit-constructor-natively)
  - [Inherit constructors natively as prototype definitions](#inherit-constructors-natively-as-prototype-definitions)
  - [Not the most faster. But have a good performance http://jsperf.com/inherit-js-vs-other/8](http://jsperf.com/inherit-js-vs-other/8) 
  - Only 0.6 kb minified





### Constructor

```javascript
var Person = inherit(function(){
	this.constructor = function(name) {
		this.name = name;
	};
	this.canSpeak = function() {
		return true;
	};
});

var me = new Person("Enzo");
console.log( me.name, me.canSpeak() ); //Enzo true
```





### Super
```javascript
var Person = inherit(function(){
	this.constructor = function(name) {
		this.name = name;
	};
	this.canSpeak = function() {
		return true;
	};
});

var Woman = inherit(Person, function( $super ){
	this.constructor = function(name) {
		$super.constructor.call(this, name );
	};
	this.canCalve = function() {
		return true;
	};
});

var me = new Woman("Enza");
console.log( me.name, me.canSpeak(), me.canCalve() ); //Enza true true
```






### Private var's
```javascript
var Person = inherit(function(){
	var private = 'secret';
	this.getPrivatePerson = function() {
		return private;
	};
});

var Man = inherit(Person, function(){
	var private = 1234;
	this.getPrivateMan = function() {
		return private;
	};
});

var me = new Man();
console.log( me.private, me.getPrivatePerson(), me.getPrivateMan() ); //undefined 'secret' 1234
```





### instanceof
```javascript
var Person = inherit(function(){
	this.canSpeak = function() {
		return true;
	};
});

var Men = inherit(Person, function( $super ){
	this.canCalve = function() {
		return true;
	};
});

var Sam = inherit(Men, function( $super ){
	this.getAge = function() {
		return 30;
	};
});

var one = new Person();
var two = new Men();
var thr = new Sam();
console.log( one instanceof Person, one instanceof Men, one instanceof Sam ); // true false false
console.log( two instanceof Person, two instanceof Men, two instanceof Sam ); // true true false
console.log( thr instanceof Person, thr instanceof Men, thr instanceof Sam ); // true true true
```








### Inherit Objects
Inherit Objects breaks the private var's and instanceof features.
```javascript
var Person = inherit({
	canSpeak: function() {
		return true;
	}
});

var Man = inherit(Person, {
	hasPenis: function() {
		return true;
	}
});

var me = new Men("Enzo");
console.log( me.canSpeak(), me.hasPenis() ); // true true
```





### Multi-inherit
```javascript
var Person = {
	canSpeak: function() {
		return true;
	}
};

var Man = {
	hasPenis: function() {
		return true;
	}
};

var Sam = {
	getAge: function() {
		return 30;
	}
};

var Multi = inherit(Person, Man, Sam);

var me = new Multi();
console.log( me.canSpeak(), me.hasPenis(), me.getAge() ); // true true 30
```




### Inherit constructor natively
```javascript
var Person = function() {
	this.canSpeak = function() {
		return true;
	}
};

var Man = function() {
	this.hasPenis = function() {
		return true;
	}
};

var Sam = function() {
	this.getAge = function() {
		return 30;
	}
};

var Multi = inherit(Person, Man, Sam);

var me = new Multi();
console.log( me.canSpeak(), me.hasPenis(), me.getAge() ); // true true 30
```



### Inherit constructors natively as prototype definitions
```javascript
var Person = function(){};
Person.prototype.canSpeak = function() {
	return true;
};


var Men = function(){};
Men.prototype.hasPenis = function() {
	return true;
};

var Myclass = inherit(Person, Men);

var me = new Myclass();
console.log( me.canSpeak(), me.hasPenis() ); // true true
```
