Hey this is some content above the code
<?php
<<<<<<< HEAD
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
=======
$name = 'Dave';
$fullName = $name . 'Stearns';

class Person {
    protected $name;
    
    public function __construct($n) {
        $this->name = $n;
    }
    
    public function getName() {
        return $this->name;
    }
}

function foo($bar) {
    echo "Hey this is the foo fighting function\n";
}

echo "Hello {$name}s\n";
foo(NULL);
>>>>>>> 278f399a03f67ccb40c80ec9fe59b166249f0dbb
?>
And this is some content below
