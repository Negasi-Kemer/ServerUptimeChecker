/**
 * Worker related tasks
 */

// Dependencies
var path = require("path");
var fs = require("fs");
var https = require("https");
var http = require("http");
var _data = require("./data");
var helpers = require("./helpers");
var url = require("url");
var _logs = require("./logs");

// Instantiate the worker object
var workers = {};

// Gather all checks, get their data, send to a validator
workers.gatherAllChecks = function () {
  _data.getAllFiles("checks", function (err, checksData) {
    if (!err && checksData && checksData.length > 0) {
      checksData.forEach((checksId) => {
        // Read using checks Id/name
        _data.read("checks", checksId, function (err, originalCheckData) {
          if (!err && originalCheckData) {
            // Pass it to the check validator and let that function continue or log error message
            workers.validateCheckData(originalCheckData);
          } else {
            console.log("Error reading one of the checks data");
          }
        });
      });
    } else {
      console.log("Error: Could not find any checks to process");
    }
  });
};

// Checks data validator
workers.validateCheckData = function (originalCheckData) {
  originalCheckData =
    typeof originalCheckData === "object" && originalCheckData != null
      ? originalCheckData
      : {};

  originalCheckData.id =
    typeof originalCheckData.id === "string" &&
    originalCheckData.id.trim().length == 20
      ? originalCheckData.id.trim()
      : false;

  originalCheckData.userPhone =
    typeof originalCheckData.userPhone === "string" &&
    originalCheckData.userPhone.trim().length == 10
      ? originalCheckData.userPhone.trim()
      : false;

  originalCheckData.protocol =
    typeof originalCheckData.protocol === "string" &&
    ["http", "https"].indexOf(originalCheckData.protocol) > -1
      ? originalCheckData.protocol
      : false;

  originalCheckData.url =
    typeof originalCheckData.url === "string" &&
    originalCheckData.url.trim().length > 0
      ? originalCheckData.url.trim()
      : false;

  originalCheckData.method =
    typeof originalCheckData.method === "string" &&
    ["post", "get", "put", "delete"].indexOf(originalCheckData.method.trim()) >
      -1
      ? originalCheckData.method.trim()
      : false;

  originalCheckData.successCodes =
    typeof originalCheckData.successCodes === "object" &&
    originalCheckData.successCodes instanceof Array &&
    originalCheckData.successCodes.length > 0
      ? originalCheckData.successCodes
      : false;

  originalCheckData.timeOutSeconds =
    typeof originalCheckData.timeOutSeconds === "number" &&
    originalCheckData.timeOutSeconds % 1 === 0 &&
    originalCheckData.timeOutSeconds >= 1 &&
    originalCheckData.timeOutSeconds <= 5
      ? originalCheckData.timeOutSeconds
      : false;

  // Set the keys that may not be set(if the workers have never seen this check before)
  originalCheckData.state =
    typeof originalCheckData.state === "string" &&
    ["up", "down"].indexOf(originalCheckData.state) > -1
      ? originalCheckData.state
      : "down";

  originalCheckData.lastChecked =
    typeof originalCheckData.lastChecked === "number" &&
    originalCheckData.lastChecked > 0
      ? originalCheckData.lastChecked
      : false;

  // If all the checks pass, pass the data along to next step in the process
  if (
    originalCheckData.id &&
    originalCheckData.userPhone &&
    originalCheckData.method &&
    originalCheckData.protocol &&
    originalCheckData.url &&
    originalCheckData.successCodes &&
    originalCheckData.timeOutSeconds
  ) {
    workers.performChecks(originalCheckData);
  } else {
    console.log(
      "Error: One of the checks is not properly formatted. Skipping it."
    );
  }
};

// Perform the checks, send the originalCheckData and outcome of the check process to the next step in the process
workers.performChecks = function (originalCheckData) {
  // Prepare the initial check outcome
  var checkOutcome = {
    error: false,
    responseCode: false,
  };

  // Mark that the outcome has not been sent yet.
  var outcomeSent = false;

  // Parse the hostname and path from the originalCheckData
  var parsedUrl = url.parse(
    originalCheckData.protocol + "://" + originalCheckData.url,
    true
  );

  var hostName = parsedUrl.hostname;
  var path = parsedUrl.path; // Using path and not 'pathname' because we need the query string

  // Construct the request
  var requestDetails = {
    protocol: originalCheckData.protocol + ":",
    hostname: hostName,
    method: originalCheckData.method.toUpperCase(),
    path: path,
    timeout: originalCheckData.timeOutSeconds * 1000,
  };

  // Instantiate the request object using either http or https module
  var _moduleToUse = originalCheckData.protocol === "http" ? http : https;
  var req = _moduleToUse.request(requestDetails, function (res) {
    // Grab status of the sent request
    var status = res.statusCode;

    // Update the 'checkOutcome' and pass the data along
    checkOutcome.responseCode = status;
    if (!outcomeSent) {
      workers.proccessCheckOutcome(originalCheckData, checkOutcome);
      outcomeSent = true;
    }
  });

  // Bind to the error event so it doesn't get thrown
  req.on("error", function (e) {
    // Update the 'checkOutcome' and pass the data along
    checkOutcome.error = {
      error: true,
      value: e,
    };
    if (!outcomeSent) {
      workers.proccessCheckOutcome(originalCheckData, checkOutcome);
      outcomeSent = true;
    }
  });

  // Bind to timeout event
  req.on("timeout", function (e) {
    // Update the 'checkOutcome' and pass the data along
    checkOutcome.error = {
      error: true,
      value: "Timeout",
    };
    if (!outcomeSent) {
      workers.proccessCheckOutcome(originalCheckData, checkOutcome);
      outcomeSent = true;
    }
  });

  // End the request
  req.end();
};

// Process the checkOutcome, update the check data as needed, trigger an alert if needed
// Special logic for accomodating a check that has never been tested before(don't alert on that one)
workers.proccessCheckOutcome = function (originalCheckData, checkOutcome) {
  // Decide if the check is considered up or down
  var state =
    !checkOutcome.error &&
    checkOutcome.responseCode &&
    originalCheckData.successCodes.indexOf(checkOutcome.responseCode) > -1
      ? "up"
      : "down";

  // Decide if an alert is warranted
  var alertWarranted =
    originalCheckData.lastChecked && originalCheckData.state !== state
      ? true
      : false;

  // Log the outcome
  var timeOfCheck = Date.now();
  workers.log(
    originalCheckData,
    checkOutcome,
    state,
    alertWarranted,
    timeOfCheck
  );

  // Update the check data
  var newCheckData = originalCheckData;
  newCheckData.state = state;
  newCheckData.lastChecked = timeOfCheck;

  // Save the updates
  _data.update("checks", newCheckData.id, newCheckData, function (err) {
    if (!err) {
      // Send the new data to the next phase in the process if needed
      if (alertWarranted) {
        workers.alertUserToStatusChange(newCheckData);
      } else {
        console.log("Checkoutcome has not changed, no need to alert");
      }
    } else {
      console.log("Error trying to save updates to one of the checks");
    }
  });
};

// Alert the user as to change in their status
workers.alertUserToStatusChange = function (newCheckData) {
  var msg =
    "Alert: Your check for " +
    newCheckData.method.toUpperCase() +
    " " +
    newCheckData.protocol +
    "://" +
    newCheckData.url +
    " is currently " +
    newCheckData.state;

  helpers.sendTwilioSMS(newCheckData.userPhone, msg, function (err) {
    if (!err) {
      console.log("Success: User notified of change in their check");
    } else {
      console.log(msg);
      console.log("Could not send alert message");
    }
  });
};

//Workers log
workers.log = function (
  originalCheckData,
  checkOutcome,
  state,
  alertWarranted,
  timeOfCheck
) {
  // Log data
  var logData = {
    originalCheckData,
    checkOutcome,
    state,
    alertWarranted,
    timeOfCheck,
  };

  // Covnert logData to string
  var logString = JSON.stringify(logData);

  // Determine the log file name
  var logFileName = originalCheckData.id;

  // Append the log string to the file
  _logs.append(logFileName, logString, function (err) {
    if (!err) {
      //
    } else {
      //
    }
  });
};

// Timer to execute the worker-process once per minute
workers.loop = function () {
  setInterval(() => {
    workers.gatherAllChecks();
  }, 1000 * 60);
};

// Rotate (Compress) the log files
workers.rotateLogs = function () {
  // Fetch all (no compressed) log files
  _logs.getAllLogs(false, function (err, logsArray) {
    if (!err && logsArray) {
      logsArray.forEach((logName) => {
        // Compress the data to a different file
        var logId = logName.replace(".log", "");
        var fileId = logId + "-" + Date.now();
        _logs.compress(logId, fileId, function (err) {
          if (!err) {
            // Truncate the log
            _logs.truncate(logId, function (err) {
              if (!err) {
                console.log("Success: Log file truncated");
              } else {
                console.log("Error truncating log file");
              }
            });
          } else {
            console.log("Error compressing one of the log files", err);
          }
        });
      });
    } else {
      console.log("Could not find any logs to rotate");
    }
  });
};

workers.logRotationLoop = function () {
  setInterval(() => {
    workers.rotateLogs();
  }, 1000 * 60 * 60 * 24);
};

// Init script
workers.init = function () {
  // Execute all the checks immediately
  workers.gatherAllChecks();

  // Call the loop so the checks will execute at specified time interval
  workers.loop();

  // Compress all the logs immediately
  workers.rotateLogs();

  // Call the compresion loop so logs will be compressed later
  workers.logRotationLoop();
};

// Export the module
module.exports = workers;
