
/*jslint newcap:true */ 

// inherit v2.0
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


    var o = 'object',
        p = 'prototype',
        c = 'constructor',
        s = '$super',
        constructor = new Function,
        create = Object.create,
        new_proto;


    return function() {

        var args = arguments,
            parent = ( args.length > 1 ) ? args[0] : constructor,
            body = args[ args.length-1 ];


        body[p] = ( parent.hasOwnProperty(p) && parent[p].hasOwnProperty(s) ) ? 
            create( parent[p] )
        :
            (typeof parent === o) ?
                create( parent )
            :
                new parent();


        new_proto = (typeof body === o) ? body : new body( body[p] );
        new_proto[s] = body[p];


        if ( !new_proto.hasOwnProperty(c) && parent === new_proto[c] )
            new_proto[c] = constructor;


        new_proto[c][p] = new_proto;
        return new_proto[c];

    }

})();





var InheritPerson = inherit(function () {
    this.local = "local1";
    this.getlocal = function(){
        return this.local + '---';
    };
});
var InheritFrenchGuy = inherit(InheritPerson, function($super) {
    this.local = "local2";
    this.getlocal = function(){
        return this.local + ' ' + this.$super.getlocal() + '---';
    };
    this.change = function(){
        this.$super.local = "LOCAL2FROMCHILD_"
    };
});

var A1 = new InheritPerson("nome1_");
var A2 = new InheritFrenchGuy("nome2_");
var A2b = new InheritFrenchGuy("nome2B_");
var A2c = new InheritFrenchGuy("nome2B_");

console.log(A1.getlocal(),A2.getlocal(),A2b.getlocal(),A2c.getlocal())
A2.change();
console.log(A1.getlocal(),A2.getlocal(),A2b.getlocal(),A2c.getlocal())
A2b.change()
console.log(A1.getlocal(),A2.getlocal(),A2b.getlocal(),A2c.getlocal())
A2c.change()
console.log(A1.getlocal(),A2.getlocal(),A2b.getlocal(),A2c.getlocal())
