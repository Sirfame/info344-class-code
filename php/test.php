Hey this is some content above the code
<?php
$name = 'Sirfame';
$fullName = $name . 'Lin';

class Person {
  protected $name;

  public function __construct($n) {
    $this->name = $n;
  }

  public function getName() {
    return $this->name;
  }
}

function foo() {
  echo "Hey this is the foo fighting function\n";
}

echo "Hello ${name}s\n";
foo('bar');
?>
And this is some content below
