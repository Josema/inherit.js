
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



var InheritPerson = inherit(function () {
        this.constructor = function(name) {
            this.name = name;
        };
        this.setAddress = function(country, city, street) {
            this.country = country;
            this.city = city;
            this.street = street;
        };
    });
    
    var InheritFrenchGuy = inherit(InheritPerson, function($super) {
            this.constructor = function (name) {
              $super.constructor.call(this, name);
            };
       
            this.setAddress = function(city, street) {
              $super.setAddress.call(this, "France", city, street);
            };
    });
    
    var InheritParisLover = inherit(InheritFrenchGuy, function($super) {
        this.constructor= function (name) {
            $super.constructor.call(this, name);
        };
       
        this.setAddress = function(street) {
            $super.setAddress.call(this, "Paris", street);
            return this;
        };
    });



var t1 = new InheritPerson("John");
t1.setAddress("US", "MT", "CH");

var t2 = new InheritFrenchGuy("Leo");
t2.setAddress("MT", "CH");

var t3 = new InheritParisLover("Mary");
t3.setAddress("CH");

console.log(t3.country, t3.city, t3.street)
