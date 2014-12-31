
// inherit v2.1
/*
	* private vars
	* super
	* constructor
	* constructor opcional
	* instanceof
    * inherit native functions
    * inherit native functions as prototype definitions
 */


/*jslint newcap:true */ 
var inherit = (function() {
    'use strict';

    var o = 'object',
        p = 'prototype',
        c = 'constructor',
        args,
        parent,
        bodyclass,
        parentisobject,
        body,
        newproto,
        hasconstructor;

    return function() {

        function newfunction(){}

        args = arguments,
        parent = args[0],
        bodyclass = (args.length == 1) ? newfunction : args[1],
        parentisobject = typeof parent === o;

        if (typeof bodyclass === o) {
            body = newfunction;
            body[p] = bodyclass;
        }
        else {
            body = bodyclass;
            body[p] = (parentisobject) ? parent : Object.create(parent[p]);
        }

        newproto = new body( body[p] );
        hasconstructor = !newproto.hasOwnProperty(c);
        if ( (hasconstructor && parent === newproto[c]) || (hasconstructor && parentisobject) )
            newproto[c] = newfunction;

        newproto[c][p] = newproto;
        return newproto[c];

    }

})();
