/*!
 * error-base <https://github.com/doowb/error-base>
 *
 * Copyright (c) 2015, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

/**
 * Code modified from http://stackoverflow.com/a/27925672/914583
 *
 * ```js
 * var CustomError = errorBase('CustomError', function (msg) {
 *   this.msg = msg;
 * });
 * ```
 *
 * @param  {String} `name` Name of new Error Class
 * @param  {Function} `init` Function to call when creating new Error
 * @return {Function} new Error Class
 * @api public
 * @name  errorBase
 */

module.exports = function errorBase (name, init) {
  if (typeof name !== 'string') {
    throw new TypeError('expected `name` to be a string.');
  }

  if (typeof init !== 'function') {
    init = identity;
  }

  function Type () {
    if (!Error.captureStackTrace) {
      this.stack = (new Error()).stack;
    }
    else {
      Error.captureStackTrace(this, this.constructor);
    }

    init.apply(this, arguments);
  }

  Type.prototype = new Error();
  Type.prototype.name = name;
  Type.prototype.constructor = Type;

  return Type;
};

function identity (message) {
  this.message = message;
}
