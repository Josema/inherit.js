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
  - Super
  - Private vars
  - instanceof
  - Multi-inherit
  - Keep $super as unique
  - Inherit everything
  - Inherit Objects
  - Inherit Objects
  - Inherit constructor natively
  - Inherit constructors natively as prototype definitions
  - Performance
  - Size





###Constructor

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
