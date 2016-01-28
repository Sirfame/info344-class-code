'use strict';

function add2(num) {
  return num;
}

var number;

var promise = new Promise(function(resolve, reject) {
  add2(1)
  .then(function(num) {
    number = num + 1;
    return number;
  });
  if (number === 1) {
    resolve("Stuff worked!");
  } else {
    reject(Error("It broke"));
  }
});

promise.then(function(result) {
  console.log(result); // "Stuff worked!"
}, function(err) {
  console.log(err); // Error: "It broke"
});
