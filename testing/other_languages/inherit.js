
// inherit v2.2
// https://github.com/Josenzo/inherit.js
/*
    * private vars
    * super
    * constructor
    * constructor opcional
    * instanceof
    * inherit functions natively
    * inherit functions natively as prototype definitions (Constructor cant be defined as YourClass.prototype.constructor)
    * inherit objects
    * inherit objects natively (no constructor, break the instanceof feature)
 */


/*jslint newcap:true */ 
var inherit = (function() {
    'use strict';


    var 
    o = 'object',
    p = 'prototype',
    c = 'constructor',
    s = '$super',
    create = Object.create,
    newbody,
    property,
    merged,
    convert = function(element, parent) {

        if (typeof element === o) {
            newbody = new Function;
            newbody[p] = element;
        }
        else {
            newbody = element;
            if ( !((element[p].hasOwnProperty(c) && element[p][c] !== element)))
                newbody[p] = new element( parent );
        }

        return newbody;

    },
    merge = function(a, b) {
        
        merged = create(a);
        for (property in b)
            merged[property] = b[property];

        return merged;

    };



    return function() {

        var args = arguments,
            parent = convert( ( args.length == 1 ) ? {} : args[0] ),
            body = convert( args[ args.length-1 ], create(parent[p]) );


        if ( !body[p].hasOwnProperty(c) )
            body[p][c] = new Function;

        body[p][c][p] = merge( parent[p], body[p]);
        body[p][c][p][s] = create(parent[p]);

        if (body[p][c][p][c] !== body[p][c])
            body[p][c][p][c] = body[p][c];

        return body[p][c];
    }



})();


function multi_inherit() {
    var args = arguments;
    if (args.length>2) {
        Array.prototype.splice.call(arguments, 0, 2, inherit(args[0], args[1]));
        return multi_inherit.apply(this, arguments);
    }
    else
        return inherit(args[0], args[1]);
}


var Person = inherit(function () {

    this.local = "local1";
    this.public1 = "public1";

    this.getlocal = function(){
        return this.local;
    };

});

var FrenchGuy = inherit(function($super) {

    this.local = "local2";
    this.public2 = "public2";

    this.getlocal = function(){
        return this.local + '-' + $super.local;
    };

});

var Multi = multi_inherit(Person, FrenchGuy, function($super) {

    this.local = "local3";
    this.public3 = "public3";

    this.constructor = function(){
        console.log($super.getlocal());
    }

});

$m = new Multi();
console.log($m.local, $m.public1, $m.public2, $m.public3, $m.getlocal())

// $a = new Person();
// $b = new FrenchGuy();
// $b2 = new FrenchGuy();

// // Testing public var
// console.log($a.public1, $b.public1, $b2.public1);
// $a.public1 = '$a';
// $b.public1 = '$b';
// $b2.public1 = '$b2';
// console.log($a.public1, $b.public1, $b2.public1);

// // Testing methods
// console.log($a.getlocal(), $b.getlocal(), $b2.getlocal());
