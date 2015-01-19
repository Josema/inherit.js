var util = require('util');

var inherit=function(){"use strict";function i(a,b){return"object"==typeof a?(e=new Function,e[f]=a):(e=a,a[f].hasOwnProperty(g)&&a[f][g]!==a||(e[f]=new a(b))),e}function j(c,d){a=h(c);for(b in d)a[b]=d[b];return a}var a,b,c,d,e,f="prototype",g="constructor",h=Object.create;return function k(a,b){return c=arguments,c.length>2?(Array.prototype.splice.call(c,0,2,k(a,b)),k.apply(this,c)):(d=i(1==c.length?{}:a),e=i(c[c.length-1],h(d[f])),e[f].hasOwnProperty(g)||(e[f][g]=new Function),e[f][g][f]=j(d[f],e[f]),e[f][g][f].$super=h(d[f]),e[f][g][f][g]=e[f][g],e[f][g])}}();


//{ rss: 778727424, heapTotal: 752510256, heapUsed: 725570768 }
//{ rss: 778711040, heapTotal: 752510256, heapUsed: 725575024 }

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


//{ rss: 1263259648, heapTotal: 1233291536, heapUsed: 1229249712 }
//{ rss: 1263017984, heapTotal: 1233291536, heapUsed: 1229251392 }

//{ rss: 1263104000, heapTotal: 1233291536, heapUsed: 1229250920 }
//{ rss: 1263153152, heapTotal: 1233291536, heapUsed: 1229251664 }



    t1.push(new InheritPerson("John"));

    t1.push(new InheritFrenchGuy("Leo"));

    t1.push(new InheritParisLover("Mary"));

}


console.log(util.inspect(process.memoryUsage()));  
