// inherit lite v1.2
/*
   * private vars
   * super
   * constructor
   * constructor opcional
   * instanceof
   * inherit objects (inherit objects break the instanceof feature)
   * inherit native functions
   * inherit native functions as prototype definitions
 */


/*jslint newcap:true */ 
var inherit = function() {
    'use strict';

    var o = 'object',
        p = 'prototype',
        c = 'constructor',
        args = arguments,
        parent = args[0],
        bodyelement = (args.length == 2) ? args[1] : function(){},
        body,
        newproto;

    if (typeof bodyelement === o) {
        body = function(){};
        body[p] = bodyelement;
    }
    else {
        body = bodyelement;
        body[p] = (typeof parent === o) ? parent : new parent();
    }

    newproto = new body(body[p]);
    newproto[c][p] = newproto;
    return newproto[c];
};

