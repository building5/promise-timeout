// Copyright (c) 2015 David M. Lee, II
'use strict';

var TimeoutError = module.exports.TimeoutError = function() {
  Error.call(this)
  Error.captureStackTrace(this, this.constructor);
  this.message = 'Timeout';
};

require('util').inherits(TimeoutError, Error);

module.exports.timeout = function(promise, timeout) {
  return Promise.race([
    promise,
    new Promise(function(resolve, reject) {
      setTimeout(function() {
        reject(new TimeoutError());
      }, timeout);
    })
  ]);
};
