// Copyright (c) 2015-2017 David M. Lee, II
'use strict';

/**
 * Exception indicating that the timeout expired.
 */
var TimeoutError = module.exports.TimeoutError = function() {
  Error.call(this)
  Error.captureStackTrace(this, this.constructor);
  this.message = 'Timeout';
};

require('util').inherits(TimeoutError, Error);

/**
 * Rejects a promise with a {@link TimeoutError} if it does not settle within
 * the specified timeout.
 *
 * @param {Promise} promise The promise.
 * @param {number} timeoutMillis Number of milliseconds to wait on settling.
 */
module.exports.timeout = function(promise, timeoutMillis) {
  var timeout;

  return Promise.race([
    promise,
    new Promise(function(resolve, reject) {
      timeout = setTimeout(function() {
        reject(new TimeoutError());
      }, timeoutMillis);
    }),
  ]).then(function(v) {
    clearTimeout(timeout);
    return v;
  }, function(err) {
    clearTimeout(timeout);
    throw err;
  });
};
