/**
 * Lobrary for storing and rotating logs
 */

// Dependencies
var fs = require("fs");
var path = require("path");
var zlib = require("zlib");
const { read } = require("./data");

// Container for the module
var lib = {};

// Base directory of the logs folder
lib.baseDir = path.join(__dirname, "/../.logs/");

// Append the log. Creat log if it doesnot exist.
lib.append = function (file, string, callback) {
  console.log("1");
  // Open the file for appending
  fs.open(lib.baseDir + file + ".log", "a", function (err, fileDescriptor) {
    if (!err && fileDescriptor) {
      // Append to the file and close it
      fs.appendFile(fileDescriptor, string + "\n", function (err) {
        if (!err) {
          fs.close(fileDescriptor, function (err) {
            if (!err) {
              callback(false);
            } else {
              callback("Error closing file that was being appended");
            }
          });
        } else {
          callback("Error appending to file");
        }
      });
    } else {
      callback("Could not open for appending");
    }
  });
};

// Get all the logs and optionaly include compressed files
lib.getAllLogs = function (includeCompressedLogs, callback) {
  // Read the .logs directory
  fs.readdir(lib.baseDir, function (err, logsArray) {
    if (!err && logsArray && logsArray.length > 0) {
      var trimmedFileNames = [];
      logsArray.forEach((fileName) => {
        // Add the .log files to the trimmedFileNames array
        if (fileName.indexOf(".log") > -1) {
          trimmedFileNames.push(fileName.replace(".log", ""));
        }

        // Add on .gz files
        if (fileName.indexOf(".gz.b64") && includeCompressedLogs) {
          trimmedFileNames.push(fileName.replace(".gz.b64", ""));
        }
      });
      callback(false, trimmedFileNames);
    } else {
      callback(err, logsArray);
    }
  });
};

// Compress the contents of one .log file to .gz.b64 file
lib.compress = function (logId, newFileId, callback) {
  var sourceFile = logId + ".log";
  var destinationFile = newFileId + ".gz.b64";

  // Read the file
  fs.readFile(lib.baseDir + sourceFile, "utf-8", function (err, inputString) {
    if (!err && inputString) {
      // Compress the data using gzip
      zlib.gzip(inputString, function (err, buffer) {
        if (!err && buffer) {
          // Send the data to the destination file
          fs.open(
            lib.baseDir + destinationFile,
            "wx",
            function (err, fileDescriptor) {
              if (!err && fileDescriptor) {
                // Write to the destination file
                fs.writeFile(
                  fileDescriptor,
                  buffer.toString("base64"),
                  function (err) {
                    if (!err) {
                      // Close the destination file descriptor
                      fs.close(fileDescriptor, function (err) {
                        if (!err) {
                          callback(false);
                        } else {
                          callback(err);
                        }
                      });
                    } else {
                      callback(err);
                    }
                  }
                );
              } else {
                callback(err);
              }
            }
          );
        } else {
          callback(err);
        }
      });
    } else {
      callback(err);
    }
  });
};

// Decompress contents of a .gz.b64 file into a string variable
lib.decompress = function (fileId, callback) {
  var fileName = fileId + ".gz.b64";
  // Read the file
  fs.readFile(lib.baseDir + fileName, "utf-8", function (err, readData) {
    if (!err && readData) {
      // Decompress the data
      var inputBuffer = Buffer.from(readData, "base64");
      zlib.unzip(inputBuffer, function (err, outPutBuffer) {
        if (!err && outPutBuffer) {
          var stringFromBuffer = outPutBuffer.toString();
          callback(false, stringFromBuffer);
        } else {
          callback(err);
        }
      });
    } else {
      callback(err);
    }
  });
};

// Truncate log file
lib.truncate = function (logId, callback) {
  fs.truncate(lib.baseDir + logId + ".log", function (err) {
    if (!err) {
      callback(false);
    } else {
      callback(err);
    }
  });
};

// EXport the module
module.exports = lib;
