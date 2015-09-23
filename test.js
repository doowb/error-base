/*!
 * error-base <https://github.com/doowb/error-base>
 *
 * Copyright (c) 2015 .
 * Licensed under the MIT license.
 */

'use strict';

/* deps:mocha */
var assert = require('assert');
var should = require('should');
var errorBase = require('./');

describe('errorBase', function () {
  it('should create a new custom error type', function () {
    var CustomError = errorBase('CustomError');
    assert.equal(CustomError.prototype.name, 'CustomError');
  });

  it('should create a new instance of a custome error type', function () {
    var CustomError = errorBase('CustomError');
    var error = new CustomError('custom message');
    assert.equal((error instanceof CustomError), true);
    assert.equal((error instanceof Error), true);
    assert.equal(error.message, 'custom message');
  });

  it('should create a new instance of a custom error with an init function', function () {
    var CustomError = errorBase('CustomError', function (msg) {
      this.msg = msg;
    });
    var error = new CustomError('custom message');
    assert.equal((error instanceof CustomError), true);
    assert.equal((error instanceof Error), true);
    assert.equal(error.msg, 'custom message');
    assert.equal(error.message, '');
  });

  it('should create a new instance of a custom error with a stack', function () {
    var CustomError = errorBase('CustomError', function (msg) {
      this.msg = msg;
    });
    var error = new CustomError('custom message');
    assert.equal((error instanceof CustomError), true);
    assert.equal((error instanceof Error), true);
    assert.equal(error.msg, 'custom message');
    assert.equal(error.message, '');
    error.should.have.property('stack');
  });

  it('should create a new instance of a custom error with multiple arguments', function () {
    var CustomError = errorBase('CustomError', function (msg, options) {
      this.message = msg;
      this.options = options || {};
    });
    var error = new CustomError('custom message', { method: 'test' });
    assert.equal((error instanceof CustomError), true);
    assert.equal((error instanceof Error), true);
    assert.equal(error.message, 'custom message');
    assert.deepEqual(error.options, { method: 'test' });
    error.should.have.property('stack');
  });

  it('should throw an error when `name` is undefined', function () {
    (function () {
      errorBase();
    }).should.throw('expected `name` to be a string.');
  });
});
