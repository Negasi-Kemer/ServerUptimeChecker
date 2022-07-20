/**
 * Library to demonstrate something throwing when it's init() is called
 */

// Container
var example = {};

// Init
example.init = function () {
  //
  var foo = bar;
};

// Export the module
module.exports = example;
