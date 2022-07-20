/**
 * Primary file for the API
 */

// Dependencies
var server = require("./lib/server");
var workers = require("./lib/workers");
var cli = require("./lib/cli");

// Declare the app
var app = {};

// Init function
app.init = function () {
  // Start the server
  server.init();

  // Start the workers
  workers.init();

  // Start the CLI. but make sure it starts last
  setTimeout(() => {
    cli.init();
  }, 50);
};

// Execute app
app.init();

// Export the module
module.exports = app;
