// augment.js 2.0
var augment;!function(t,o){"function"==typeof define&&define.amd?define(o):"object"==typeof module?module.exports=o():t.augment=o()}(this,function(){"use strict";var t=function(){},o=Array.prototype.slice;return augment=function(e,n){var r=t.prototype="function"==typeof e?e.prototype:e,i=new t,a=n.apply(i,o.call(arguments,2).concat(r));if("object"==typeof a)for(var c in a)i[c]=a[c];if(!i.hasOwnProperty("constructor"))return i;var s=i.constructor;return s.prototype=i,s},augment.defclass=function(t){var o=t.constructor;return o.prototype=t,o},augment.extend=function(t,o){return augment(t,function(t){return this.uber=t,o})},augment});


var Person = augment.defclass({
    constructor: function(nome) {},
    local: "local1",
    public1: "public1",

    getlocal: function(){
        return this.local;
    }

});

var FrenchGuy = augment(Person, function($super) {
    this.constructor = function() {};
    this.local = "local2";
    this.public2 = "public2";

    this.getlocal = function(){
        return this.local + '-' + $super.getlocal();
    };

});


$a = new Person();
$b = new FrenchGuy();
$b2 = new FrenchGuy();

// Testing public var
console.log($a.public1, $b.public1, $b2.public1);
$a.public1 = '$a';
$b.public1 = '$b';
$b2.public1 = '$b2';
console.log($a.public1, $b.public1, $b2.public1);

// Testing methods
console.log($a.getlocal(), $b.getlocal(), $b2.getlocal());

