
// inherit v2.0
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
var inherit = function() {
    'use strict';

    var o = 'object',
        p = 'prototype',
        c = 'constructor',
        newfunction = function(){},
        args = arguments,
        parent = args[0],
        bodyclass = (args.length == 1) ? newfunction : args[1],
        parentisobject = typeof parent === o,
        body,
        newproto,
        hasconstructor;

    if (typeof bodyclass === o) {
        body = newfunction;
        body[p] = bodyclass;
    }
    else {
        body = bodyclass;
        body[p] = (parentisobject) ? parent : new parent();
    }

    newproto = new body( body[p] );
    hasconstructor = !newproto.hasOwnProperty(c);
    if ( (hasconstructor && parent === newproto[c]) || (hasconstructor && parentisobject) )
        newproto[c] = newfunction;

    newproto[c][p] = newproto;
    return newproto[c];

};
