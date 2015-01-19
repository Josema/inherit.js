var util = require('util');



var inherit = (function() {
    'use strict';


    var
        p = 'prototype',
        c = 'constructor',
        create = Object.create;


    function convert(element, parent) {

        var newbody;

        if (typeof element == 'object') {
            newbody = new Function;
            newbody[p] = element;
        } else {
            newbody = element;
            if (!(element[p].hasOwnProperty(c) && element[p][c] !== element))
                newbody[p] = new element(parent);
        }

        return newbody;

    }


    function merge(a, b) {

        var merged = create(a),
            property;
        for (property in b)
            merged[property] = b[property];

        return merged;

    }



    return function inherit_processor() {

        var args = arguments,
            parent, body;

        if (args.length > 2) {
            Array.prototype.splice.call(args, 0, 2, inherit_processor(args[0], args[1]));
            return inherit_processor.apply(this, args);
        }

        parent = convert((args.length == 1) ? {} : args[0]),
            body = convert(args[args.length - 1], create(parent[p]));

        if (!body[p].hasOwnProperty(c))
            body[p][c] = new Function;

        body[p][c][p] = merge(parent[p], body[p]);

        if (typeof args[args.length - 1] == 'object' || args[args.length - 1][p][c] !== args[args.length - 1])
            body[p][c][p].$super = create(parent[p]);

        if (body[p][c][p][c] !== body[p][c])
            body[p][c][p][c] = body[p][c];

        return body[p][c];
    };



})();









t1=[];
for (i=0;i<99999;++i){



var InheritPerson = inherit(function() {
    this.constructor = function(name) {
        this.name = name;
    };
    this.setAddress = function(country, city, street) {
        this.country = country;
        this.city = city;
        this.street = street;
    };
});
t1.push(InheritPerson);


var InheritFrenchGuy = inherit(InheritPerson, function($super) {
    this.constructor = function(name) {
        $super.constructor.call(this, name);
    };

    this.setAddress = function(city, street) {
        $super.setAddress.call(this, "France", city, street);
    };
});
t1.push(InheritFrenchGuy);



var InheritParisLover = inherit(InheritFrenchGuy, function($super) {
    this.constructor = function(name) {
        $super.constructor.call(this, name);
    };

    this.setAddress = function(street) {
        $super.setAddress.call(this, "Paris", street);
        return this;
    };
});
t1.push(InheritParisLover);



//{ rss: 116776960, heapTotal: 109760512, heapUsed: 77907520 }
//{ rss: 117035008, heapTotal: 109760512, heapUsed: 77907808 }


    t1.push(new InheritPerson("John"));

    t1.push(new InheritFrenchGuy("Leo"));

    t1.push(new InheritParisLover("Mary"));

}


console.log(util.inspect(process.memoryUsage()));   
