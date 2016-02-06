'use strict';

//Problem 1
// function add2(value) {
//   return new Promise(function(resolve, reject) {
//     resolve(value);
//   }).then(function(value) {
//     return value + 1;
//   }).then(function(value) {
//     return value + 1;
//   }).then(function(value) {
//     console.log(value);
//   }).catch(function(err) {
//     console.error(err);
//   });
// }
//
// add2(1);

//Problem 2
var http = require('http');

function get(url) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual request stuff
    http.get(url, function(res) {
        var body = '';
        res.on('data', function(chunk) {
            body += chunk;
        });
        res.on('end', function() {
            resolve(body);
        }).then(function(body) {
          console.log(body);
        });
    }).on('error', function(err) {
        reject(err);
    });
  });
}

get('http://www.omdbapi.com/?i=tt0120737&plot=short&r=json');
