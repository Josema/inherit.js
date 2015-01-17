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
    merge = function(a, b) {
        
        merged = create(a);
        for (property in b)
            merged[property] = b[property];

        return merged;

    },
    convert = function(element, parent) {

        if (typeof element === o) {
            newbody = new Function;
            newbody[p] = create( element );
        }
        else {
            newbody = element;
            if ( !((element[p].hasOwnProperty(c) && element[p][c] !== element)))
                newbody[p] = new element( parent );
        }

        return newbody;

    };



    return function() {

        var args = arguments,
            parent = convert( ( args.length == 1 ) ? {} : args[0] ),
            body = convert( args[ args.length-1 ], create(parent[p]) );


        if ( !body[p].hasOwnProperty(c) )
            body[p][c] = new Function;

        body[p][c][p] = merge( parent[p], body[p]);
        body[p][c][p][s] = parent[p];

        return body[p][c];

    }



})();


var Person = inherit(function () {

    this.local = "local1";
    this.public1 = "public1";

    this.getlocal = function(){
        return this.local;
    };

});

var FrenchGuy = inherit(Person, function($super) {

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
