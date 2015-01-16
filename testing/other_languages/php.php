<?php
function console_log($str) { echo "$str\n"; }


class Person {

    public $local = 'local1';
    public $public1 = 'public1';

    function getlocal() {
    	return $this->local;
    }

}

class FrenchGuy extends Person {

    public $local = 'local2';
    public $public2 = 'public2';

    function getlocal() {
    	return $this->local . '-' . parent::getlocal();
    }
}


$a = new Person();
$b = new FrenchGuy();
$b2 = new FrenchGuy();

// Changing public1 outside
console_log($a->public1 . ' ' . $b->public1 . ' ' . $b2->public1);
$a->public1 = '$a';
$b->public1 = '$b';
$b2->public1 = '$b2';
console_log($a->public1 . ' ' . $b->public1 . ' ' . $b2->public1);


// Testing methods
console_log($a->getlocal() . ' ' . $b->getlocal() . ' ' . $b2->getlocal());

?>

