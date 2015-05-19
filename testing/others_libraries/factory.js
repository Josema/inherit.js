
var FactoryPerson = function() {

    var $this = {
        init: FactoryPerson.init,
        setAddress: FactoryPerson.setAddress
    };

    $this.init.apply($this, arguments);

    return $this;

};
FactoryPerson.init = function( name ) {
    this.name = name;
};
FactoryPerson.setAddress = function( country, city, street ) {
    this.country = country;
    this.city = city;
    this.street = street;
};







var FactoryFrenchGuy = function() {

    var $this = FactoryPerson();

    $this.init = FactoryFrenchGuy.init;

    $this.setAddress = FactoryFrenchGuy.setAddress;

    $this.init.apply($this, arguments);

    return $this;

};
FactoryFrenchGuy.init = function(name) {
    FactoryPerson.init.call(this, name);
};
FactoryFrenchGuy.setAddress = function(city, street) {
    FactoryPerson.setAddress.call(this, "France", city, street);
};




var FactoryParisLover = function() {

    var $this = FactoryFrenchGuy();

    $this.init = FactoryParisLover.init;

    $this.setAddress = FactoryParisLover.setAddress;

    $this.init.apply($this, arguments);

    return $this;

};
FactoryParisLover.init = function(name) {
    FactoryFrenchGuy.init.call(this, name);
};
FactoryParisLover.setAddress = function(street) {
    FactoryFrenchGuy.setAddress.call(this, 'Paris', street);
};




var t1 = FactoryPerson("John");
t1.setAddress("US", "MT", "CH");
console.log(t1.country, t1.city, t1.street, t1.name);

var t2 = FactoryFrenchGuy("Leo");
t2.setAddress("MT", "CH");
console.log(t2.country, t2.city, t2.street, t2.name);

var t3 = FactoryParisLover("Mary");
t3.setAddress("CH");
console.log(t3.country, t3.city, t3.street, t3.name);





var t1 = FactoryPerson("John222");
t1.setAddress("US222", "MT222", "CH22");
console.log(t1.country, t1.city, t1.street, t1.name);

var t2 = FactoryFrenchGuy("Leo222");
t2.setAddress("MT222", "CH222");
console.log(t2.country, t2.city, t2.street, t2.name);

var t3 = FactoryParisLover("Mary222");
t3.setAddress("CH222");
console.log(t3.country, t3.city, t3.street, t3.name);
