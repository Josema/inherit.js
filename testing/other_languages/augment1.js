// augment.js 1.0
var augment=function(t,o){"use strict";function e(t){var o="function"==typeof this?this.prototype:this,e=Object.create(o);if(t.apply(e,i(arguments,1).concat(o)),!a(e,"constructor"))return e;var n=e.constructor;return n.prototype=e,n}var n=Function.bindable=t.bind(t),r=Function.callable=n(o),i=Array.from=r(Array.prototype.slice),a=Object.ownPropertyOf=r(Object.hasOwnProperty);return Object.defineProperty(Object.prototype,"augment",{value:e}),r(e)}(Function.bind,Function.call);


var Person = Object.augment(function() {
	this.constructor = function() {console.log(1.1)}
    this.local = "local1";
    this.public1 = "public1";

    this.getlocal = function(){
        return this.local;
    };
console.log(1)
});

var FrenchGuy = Person.augment(function($super) {
	this.constructor = function() {console.log(2.1)}
    this.local = "local2";
    this.public2 = "public2";

    this.getlocal = function(){
        return this.local + '-' + $super.getlocal();
    };
console.log(2)
});

$a = new Person("nome1_");
$b = new FrenchGuy("nome2_");
$b2 = new FrenchGuy("nome2B_");

// Testing public var
console.log($a.public1, $b.public1, $b2.public1);
$a.public1 = '$a';
$b.public1 = '$b';
$b2.public1 = '$b2';
console.log($a.public1, $b.public1, $b2.public1);

// Testing methods
console.log($a.getlocal(), $b.getlocal(), $b2.getlocal());
