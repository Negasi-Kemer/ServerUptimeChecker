/**
 * Server related tasks
 */

// Http module
var http = require("http");

// Https module
var https = require("https");

// Url module
var url = require("url");
// Fs
var fs = require("fs");

// Config file
var config = require("./config");

// Handlers
var handlers = require("./handlers");

// Helpers
var helpers = require("./helpers");

// Path
var path = require("path");
const { type } = require("os");
const { debug } = require("console");

// instantiate the server module object
var server = {};

// String decoder
const StringDecoder = require("string_decoder").StringDecoder;

// Http server
server.httpServer = http.createServer(function (req, res) {
  server.unifiedServer(req, res);
});

// Https server options - keys
server.httpsServerOptions = {
  key: fs.readFileSync(path.join(__dirname, "/../https/key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "/../https/cert.pem")),
};

// Https server
server.httpsServer = https.createServer(
  server.httpsServerOptions,
  function (req, res) {
    server.unifiedServer(req, res);
  }
);

// All the server logic for both http and https
server.unifiedServer = function (req, res) {
  // Parse requested url
  const parsedUrl = url.parse(req.url, true);

  var path = parsedUrl.pathname;

  // Trim slashes from path
  var trimmedPath = path.replace(/^\/+|\/+$/g, "");

  // Query string parameters
  var queryStringObject = parsedUrl.query;

  // Request method
  var method = req.method.toLowerCase();

  // Request header
  var headers = req.headers;

  // Decoder instance
  const decoder = new StringDecoder("utf-8");
  let buffer = "";

  // Read payload
  req
    .on("data", function (chunk) {
      buffer += decoder.write(chunk);
    })
    .on("end", function () {
      buffer += decoder.end();
      // Choose the handler for the request based on the requested path
      var choosenHandler =
        typeof server.router[trimmedPath] !== "undefined"
          ? server.router[trimmedPath]
          : handlers.notfound;

      // If the request is within the public directory, use the public handler instead
      choosenHandler =
        trimmedPath.indexOf("public/") > -1 ? handlers.public : choosenHandler;
      // Construct the data object to send to the handler
      var data = {
        trimmedPath: trimmedPath,
        queryStringObject: queryStringObject,
        method: method,
        headers: headers,
        payload: helpers.parseJsonToObject(buffer),
      };
      // Route the request to the handler specified in the router
      try {
        choosenHandler(data, function (statusCode, payload, contentType) {
          server.processHandlerResponse(
            res,
            method,
            trimmedPath,
            statusCode,
            payload,
            contentType
          );
        });
      } catch (error) {
        // debug(error);
        server.processHandlerResponse(
          res,
          method,
          trimmedPath,
          500,
          { Error: "Unknown Server Error" },
          "json"
        );
      }
    });
};

server.processHandlerResponse = function (
  res,
  method,
  trimmedPath,
  statusCode,
  payload,
  contentType
) {
  // Use the statusCode in the handler or set defualt t0 200
  statusCode = typeof statusCode === "number" ? statusCode : 200;

  // Determine the type of response (fallback to Json)
  contentType = typeof contentType === "string" ? contentType : "json";

  // Return the response-parts that are content-specific
  var payloadString = "";
  if (contentType === "json") {
    res.setHeader("Content-Type", "application/json");
    payload = typeof payload === "object" ? payload : {};
    payloadString = JSON.stringify(payload);
  }

  if (contentType === "html") {
    res.setHeader("Content-Type", "text/html");
    payloadString = typeof payload === "string" ? payload : "";
  }

  if (contentType === "favicon") {
    res.setHeader("Content-Type", "image/x-icon");
    payloadString = typeof payload !== undefined ? payload : "";
  }

  if (contentType === "css") {
    res.setHeader("Content-Type", "text/css");
    payloadString = typeof payload === "string" ? payload : "";
  }

  if (contentType === "jpg") {
    res.setHeader("Content-Type", "image/jpeg");
    payloadString = typeof payload !== undefined ? payload : "";
  }

  if (contentType === "png") {
    res.setHeader("Content-Type", "image/png");
    payloadString = typeof payload !== undefined ? payload : "";
  }

  if (contentType === "plain") {
    res.setHeader("Content-Type", "text/plain");
    payloadString = typeof payload === "string" ? payload : "";
  }

  // Return the response-parts that are common to all content-types
  res.writeHead(statusCode);
  res.end(payloadString);
};

// Define routers
server.router = {
  "": handlers.index,
  "account/create": handlers.accountCreate,
  "account/edit": handlers.accountEdit,
  "account/deleted": handlers.accountDeleted,
  "session/create": handlers.sessionCreate,
  "session/deleted": handlers.sessionDeleted,
  "checks/all": handlers.checksList,
  "checks/create": handlers.checksCreate,
  "checks/edit": handlers.checksEdit,
  ping: handlers.ping,
  "api/users": handlers.users,
  "api/tokens": handlers.tokens,
  "api/checks": handlers.checks,
  favicon: handlers.favicon,
  public: handlers.public,
  "examples/error": handlers.exampleError,
};

// The init function
server.init = function () {
  // Start the HTTP server
  server.httpServer.listen(config.httpPort, function () {
    console.log(
      "Server running on port " + config.httpPort + " from Http server"
    );
  });

  // Start the HTTPS server
  server.httpsServer.listen(config.httpsPorrt, function () {
    console.log(
      "Server running on port " + config.httpsPort + " from Https server"
    );
  });
};

// Export the module
module.exports = server;
