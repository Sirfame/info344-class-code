'use strict';

var express = require('express');           //sub-routers
var request = require('request');           //request URLs
var htmlparser = require('htmlparser2');    //parse html

module.exports.Router = function(stories) {
    //create a new Express Router
    //an Express application is a router, but we can also
    //create sub-routers that we can add to the application
    //this router will handle all routes related to stories
    var router = express.Router();

    //GET /stories
    router.get('/stories', function(req, res, next) {
        //return the first page of stories from the database
        //TODO: support offset and limit as query string parameters
        //so the clients can page through all stories
        stories.getAll()
            .then(function(rows) {
                res.json(rows);
            })
            .catch(next);
    });

    //POST /stories
    router.post('/stories', function(req, res, next) {
        //insert a new story into the database
        //and return the data with default values
        //applied

        //TODO: validate that req.body.url exists and is a valid URL

        //fetch the HTML for the new URL
        var inTitleElem = false;
        //create a new WriteableStream parser
        //this takes a set of callbacks that are called when the parser
        //encounters an open tag, text, and a close tag
        var parser = new htmlparser.WritableStream({
            //called whenever the parser encounters an open tag
            onopentag: function(name, attrs) {
                //detect if the tag is named 'title'
                inTitleElem = ('title' === name);
            },
            ontext: function(text) {
                //if we are in the title element
                if (inTitleElem) {
                    //ontext may be called several times, so append
                    //the text value to req.body.title, or set
                    //req.body.title if it doesn't exist yet
                    if (req.body.title) {
                        req.body.title += text;
                    }
                    else {
                        req.body.title = text;
                    }
                }
            },
            onclosetag: function() {
                //once the tag closes we are no longer
                //in the title element by definition
                inTitleElem = false;
            }
        }, {decodeEntities: true});

        //get the URL and pipe it into the parser
        request.get(req.body.url, {followRedirect: false})
            .on('error', function() {
                console.error('error requesting page, using url for title');
                req.body.title = req.body.url;
            })
            .on('end', function() {
                //insert the new story
                stories.insert(req.body)
                    .then(function(row) {
                        //echo back the story with all default values applied
                        res.json(row);
                    })
                    .catch(next); //forwards the error to Express
            })
            .pipe(parser);

    });

    //POST /stories/1234/votes
    //the :id is like a wildcard--it matches any value
    //and express will make the value it matches available as req.params.id
    router.post('/stories/:id/votes', function(req, res, next) {
        //upvote the story and return the
        //full story with current number of votes
        //the property on req.params will have the same name as whatever
        //you had following the : in the URL
        stories.upVote(req.params.id)
            .then(function(row) {
                res.json(row);
            })
            .catch(next);
    });

    return router;
};












//What i did in class

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


//
// module.exports.Router = function(passport) {
//
// 	// =========================================================================
//     // passport session setup ==================================================
//     // =========================================================================
//     // required for persistent login sessions
//     // passport needs ability to serialize and unserialize users out of session
//
//     // used to serialize the user for the session
//     passport.serializeUser(function(user, done) {
// 		done(null, user.id);
//     });
//
//     // used to deserialize the user
//     passport.deserializeUser(function(id, done) {
// 		connection.query("select * from users where id = "+id,function(err,rows){
// 			done(err, rows[0]);
// 		});
//     });
//
//
//  	// =========================================================================
//     // LOCAL SIGNUP ============================================================
//     // =========================================================================
//     // we are using named strategies since we have one for login and one for signup
// 	// by default, if there was no name, it would just be called 'local'
//
//     passport.use('local-signup', new LocalStrategy({
//         // by default, local strategy uses username and password, we will override with email
//         usernameField : 'email',
//         passwordField : 'password',
//         passReqToCallback : true // allows us to pass back the entire request to the callback
//     },
//     function(req, email, password, done) {
//
// 		// find a user whose email is the same as the forms email
// 		// we are checking to see if the user trying to login already exists
//         connection.query("select * from users where email = '"+email+"'",function(err,rows){
// 			console.log(rows);
// 			console.log("above row object");
// 			if (err)
//                 return done(err);
// 			 if (rows.length) {
//                 return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
//             } else {
//
// 				// if there is no user with that email
//                 // create the user
//                 var newUserMysql = new Object();
//
// 				newUserMysql.email    = email;
//                 newUserMysql.password = password; // use the generateHash function in our user model
//
// 				var insertQuery = "INSERT INTO users ( email, password ) values ('" + email +"','"+ password +"')";
// 					console.log(insertQuery);
// 				connection.query(insertQuery,function(err,rows){
// 				newUserMysql.id = rows.insertId;
//
// 				return done(null, newUserMysql);
// 				});
//             }
// 		});
//     }));
//
//     // =========================================================================
//     // LOCAL LOGIN =============================================================
//     // =========================================================================
//     // we are using named strategies since we have one for login and one for signup
//     // by default, if there was no name, it would just be called 'local'
//
//     passport.use('local-login', new LocalStrategy({
//         // by default, local strategy uses username and password, we will override with email
//         usernameField : 'email',
//         passwordField : 'password',
//         passReqToCallback : true // allows us to pass back the entire request to the callback
//     },
//     function(req, email, password, done) { // callback with email and password from our form
//
//          connection.query("SELECT * FROM `users` WHERE `email` = '" + email + "'",function(err,rows){
// 			if (err)
//                 return done(err);
// 			 if (!rows.length) {
//                 return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
//             }
//
// 			// if the user is found but the password is wrong
//             if (!( rows[0].password == password))
//                 return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
//
//             // all is well, return successful user
//             return done(null, rows[0]);
//
// 		});
//
//
//
//     }));
//
// };
