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
var Person = function(){
	this.canSpeak = function() {
		return true;
	};
};


var Men = inherit(Person, function($super){
	this.hasPenis = function() {
		return true;
	};
});


var me = new Men();
console.log( me.canSpeak(), me.hasPenis() ); // true true
```


## Features

  - Constructor
  - Super
  - Private vars
  - instanceof
  - Multi-inherit
  - Keep $super as unique
  - Inherit Objects
  - Inherit constructor natively
  - Inherit constructors natively as prototype definitions
  - Performance
  - Size
