// inherit lite v1.2
/*
   * private vars
   * super
   * constructor
   * constructor opcional
   * instanceof
   * inherit objects (inherit objects without inherit wrapper breaks the instanceof feature)
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
        bodyclass = (args.length == 2) ? args[1] : newfunction,
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

    newproto = new body(body[p]);
    hasconstructor = !newproto.hasOwnProperty(c);
    if ( (hasconstructor && parent === newproto[c]) || (hasconstructor && parentisobject))
    	newproto[c] = newfunction;

    newproto[c][p] = newproto;
    return newproto[c];
};



