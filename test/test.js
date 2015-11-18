// Copyright (c) 2015 David M. Lee, II
'use strict';

var pt = require('../index.js');
var assert = require('assert');

function later(when) {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, when);
  });
}

describe('promise-timeout', function() {
  describe('a slow promise', function() {
    it('should time out', function() {
      return pt.timeout(later(1000), 10)
        .then(function() {
          assert.fail('should not have resolved');
        }, function(err) {
          assert(err instanceof pt.TimeoutError);
        });
    });
  });

  describe('a fast promise', function() {
    it('should resolve', function() {
      return pt.timeout(later(10), 1000)
        .then(function() {
        }, function(err) {
          assert.fail('should have resolved');
        });
    });
  });
});
