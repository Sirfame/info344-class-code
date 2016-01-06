<?php
function randomNum() {
  $random = rand(0, 500);
  echo "Your new random integer is ${random}\n";
}
//randomNum();

function month() {
  $months = array (
    0 => "bar",
    1 => "foo",
  );
  for($i = 0; $i < 12; $i++) {
    array_push($months, jdmonthname ($i , 1));
  }
  for($i = 0; $i < count($months); $i++) {
    echo "$months[$i]\n";
  }
}
month();
?>
