var errorBase = require('./');

// Create a new HelperError that takes additional options.
var HelperError = errorBase('HelperError', function (msg, options) {
  this.message = msg;
  this.options = options || {};
});

try {
  // Throw a HelperError given the custom arguments
  throw new HelperError('some error message', {
    helper: 'helper-name',
    foo: 'bar'
  });
} catch (err) {
  console.log(err.message);
  //=> 'some error message'

  console.log(err.options);
  //=> { helper: 'helper-name', foo: 'bar' }
}
