/**
 * Primary file for the API
 */

// Dependencies
var server = require("./lib/server");
var workers = require("./lib/workers");
var cli = require("./lib/cli");
var exmapleDebuggingProblem = require("./lib/exampleDebuggingProblem");

// Declare the app
var app = {};

// Init function
app.init = function () {
  // Start the server
  debugger;
  server.init();
  debugger;
  // Start the workers
  debugger;
  // workers.init();

  // Start the CLI. but make sure it starts last
  debugger;
  setTimeout(() => {
    cli.init();
  }, 50);
  debugger;
  // Call the example debugger init()
  exmapleDebuggingProblem.init();
  debugger;
};

// Execute app
app.init();

// Export the module
module.exports = app;
