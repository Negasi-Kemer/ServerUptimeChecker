/**
 * Test runner
 */

// Dependencies
var helpers = require("./../lib/helpers");
var assert = require("assert");

// Application logic for the test runner
_app = {};

// Container for the tests
_app.tests = {
  unit: {},
};

// Assert that the getANumber is returning a number
_app.tests.unit["helpers.getANumber should return a number"] = function () {
  var val = helpers.getANumber();
  assert.equal(typeof val, "number");
  done();
};

// Assert that the getANumber is returning 1
_app.tests.unit["helpers.getANumber should return 1"] = function () {
  var val = helpers.getANumber();
  assert.equal(val, 1);
  done();
};

// Assert that the getANumber is returning 2
_app.tests.unit["helpers.getANumber should return 2"] = function () {
  var val = helpers.getANumber();
  assert.equal(val, 2);
  done();
};
