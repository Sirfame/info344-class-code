'use strict';

var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
//Returns new express router
module.exports.Router = function(Story) {
  var router = express.Router();

  router.get('/stories', function(req, res, next) {
    //return all stories from the database
    Story.getAll()
      .then(function(rows) {
        res.json(rows);
      })
      .catch(next);
  });

  router.post('/stories', function(req, res, next) {
    //insert a new story into the database
    //and return the data with default values
    //applied
    request.get(req.body.url, function(err, response, body) {
      if(err) {
        req.body.title = req.body.url;
      } else {
        var $ = cheerio.load(body);
        req.body.title = $('head title').text();
      }
      Story.insert(req.body)
        .then(function(rows) {
          res.json(rows);
        })
        .catch(next);
    });


  });

  //after colon (":id") needs to match req.params____
  router.post('/stories/:id/votes', function(req, res, next) {
    //upvote the story and return the
    //full story with current number of votes
    Story.upVote(req.params.id)
      .then(function(row) {
        res.json(row);
      })
      .catch(next);
  });

  return router;
}
