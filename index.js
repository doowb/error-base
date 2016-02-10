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
 * @param {Boolean} `capture` Optional parameter to determine if the stack trace should be captured or not. (Defaults to `true`)
 * @return {Function} new Error Class
 * @api public
 */

module.exports = function errorBase (name, init, capture) {
  if (typeof name !== 'string') {
    throw new TypeError('expected `name` to be a string.');
  }

  if (typeof init !== 'function') {
    init = identity;
  }
  capture = typeof capture === 'boolean' ? capture : true;

  function Type () {
    if (capture) {
      if (!Error.captureStackTrace) {
        define(this, 'stack', (new Error()).stack);
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
    init.apply(this, arguments);
  }

  Type.prototype = Object.create(Error.prototype);
  Type.prototype.name = name;
  Type.prototype.constructor = Type;

  return Type;
};

/**
 * Default identity function used to just set the `message` property when another
 * `init` function is not passed in.
 *
 * @param  {String} `message` Message to set.
 */

function identity (message) {
  this.message = message;
}

/**
 * Define a non-enumerable property on an object.
 *
 * @param  {Object} `obj` Object to define property on.
 * @param  {String} `prop` Property name.
 * @param  {*} `val` Value to define on the property.
 */

function define(obj, prop, val) {
  Object.defineProperty(obj, prop, {
    enumerable: false,
    configurable: true,
    value: val
  });
}
