var inherit = (function() {
    'use strict';


    var o = 'object',
        p = 'prototype',
        c = 'constructor',
        s = '$super',
        create = Object.create,
        new_proto;


    return function() {

        var args = arguments,
            body = args[ args.length-1 ],
            parent = ( args.length < 2 && body[p][c] === body ) ? new Function : args[0];


        body[p] = (typeof parent === o) ? 
            create( parent )
        :
            ( parent[p].hasOwnProperty(s) )  ?
                create( parent[p] )
            :
                new parent();


        new_proto = (typeof body === o) ? body : new body( body[p] );
        new_proto[s] = body[p];


        if ( !new_proto.hasOwnProperty(c) && parent === new_proto[c] )
            new_proto[c] = new Function;


        new_proto[c][p] = new_proto;
        return new_proto[c];

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

