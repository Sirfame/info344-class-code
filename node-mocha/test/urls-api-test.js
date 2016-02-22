'use strict';

var should = require('should');
var request = require('request-promise');

var url = 'http://www.google.com';

var host = process.env.HOST || '127.0.0.1';
var baseUrl = 'http://' + host + '/api/v1';

var shortPath;

describe('urls API', function() {
    it('should create a new short URL', function() {
        var options = {
          method: 'POST',
          uri: baseUrl + '/urls',
          body: {url: url},
          json: true
        };
        return request(options)
            .then(function(body) {
                body.should.have.ownProperty('shortPath');
                body.shortPath.length.should.be.above(0);
                //console.log(body.shortPath);
                shortPath = body.shortPath;
            });
    });

    it('should return full URL for short path', function() {
        var options = {
          method: 'GET',
          uri: baseUrl + '/urls/' + shortPath,
          json: true
        };

        return request(options)
            .then(function(body) {
              body.should.have.ownProperty('url');
              body.url.should.be.equal(url);
            });
    });

    it('should delete given a short path', function() {
        var options = {
          method: 'DELETE',
          uri: baseUrl + '/urls/' + shortPath,
          json: true
        };

        return request(options)
            .then(function(body) {
                body.should.not.have.ownProperty('url');
            });
    });
});
