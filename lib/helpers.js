/**
 * Helpers for various tasks
 */

// Dependencies
var crypto = require("crypto");
var config = require("./config");
var https = require("https");
var querystring = require("querystring");
var fs = require("fs");
var path = require("path");

// Containers for helpers
var helpers = {};

// Sample for testing
helpers.getANumber = function () {
  return 1;
};

// Hash
helpers.hash = function (str) {
  if (typeof str == "string" && str.length > 0) {
    var hash = crypto
      .createHmac("sha256", config.hashingSecret)
      .update(str)
      .digest("hex");
    return hash;
  } else {
    return false;
  }
};

// Parse JSON string to an object
helpers.parseJsonToObject = function (JsonStr) {
  try {
    var obj = JSON.parse(JsonStr);
    return obj;
  } catch (error) {
    return {};
  }
};

// Create random alphanumeric string
helpers.createRandomString = function (strLength) {
  strLength =
    typeof strLength === "number" && strLength > 0 ? strLength : false;
  if (strLength) {
    // All possible characters for the random string are A-Z and 0-9
    var possibleCharacter = "abcdefghijklmnopqrstuvwxyz0123456789";
    // Final string
    var str = "";
    for (let i = 1; i <= strLength; i++) {
      // Get random character from 'possibleCharacter'
      var randomCharacter = possibleCharacter.charAt(
        Math.floor(Math.random() * possibleCharacter.length)
      );
      // Append the random character to the final string 'str'
      str += randomCharacter;
    }
    return str;
  } else {
    return false;
  }
};

// Send SMS message via Twilio
helpers.sendTwilioSMS = function (phone, msg, callback) {
  phone =
    typeof phone.trim() === "string" && phone.trim().length === 10
      ? phone.trim()
      : false;
  msg =
    typeof msg.trim() === "string" &&
    msg.trim().length > 0 &&
    msg.trim().length <= 1600
      ? msg.trim()
      : false;

  if (phone && msg) {
    // Configure the request payload
    var payload = {
      From: config.twilio.fromPhone,
      To: "+251" + phone,
      Body: msg,
    };
    // Stirngify the payload
    var stringPayload = querystring.stringify(payload);

    // Configure the request details
    var requestDetails = {
      protocol: "https:",
      hostname: "api.twilio.com",
      method: "POST",
      port: 443,
      path:
        "/2010-04-01/Accounts/" + config.twilio.accountSid + "/Messages.json",
      auth: config.twilio.accountSid + ":" + config.twilio.authToken,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(stringPayload),
      },
    };
    // Instantiate the request
    const req = https.request(requestDetails, (res) => {
      // Request status
      var status = res.statusCode;
      // Callback if the request went through
      if (status === 200 || status === 201) {
        callback(false);
      } else {
        callback("Status code returned was: " + status);
      }
    });

    // Bind the error request
    req.on("error", function (e) {
      callback(e);
    });

    // Add the payload
    req.write(stringPayload);

    // End the request
    req.end();
  } else {
    callback("Required fields are missing or invalid");
  }
};

helpers.getTemplates = function (templateName, data, callback) {
  templateName =
    typeof templateName === "string" && templateName.length > 0
      ? templateName
      : false;

  data = typeof data === "object" && data != null ? data : {};
  if (templateName) {
    // Templates root directory
    var templatesDir = path.join(__dirname, "/../templates/");
    fs.readFile(
      templatesDir + templateName + ".html",
      "utf-8",
      function (err, templateData) {
        if (!err && templateData && templateData.length > 0) {
          // Do interpolation
          var finalString = helpers.interpolate(templateData, data);
          callback(false, finalString);
        } else {
          callback("No template found.");
        }
      }
    );
  } else {
    callback("A valid template name was not specified");
  }
};

// Add the universal header and footer to a string, and pass provided data object to the header and footer for interpolation
helpers.addUniversalTemplates = function (str, data, callback) {
  str = typeof str === "string" && str.length > 0 ? str : false;
  data = typeof data === "object" && data != null ? data : {};

  // Get the header
  helpers.getTemplates("_header", data, function (err, headerString) {
    if (!err && headerString) {
      // Get the footer
      helpers.getTemplates("_footer", data, function (err, footerString) {
        if (!err && footerString) {
          // Add them all together
          var fullString = headerString + str + footerString;
          callback(false, fullString);
        } else {
          callback("Could not find footer string");
        }
      });
    } else {
      callback("Could not find the header file");
    }
  });
};
// Take a given string and data object and find/replace all the keys within it.
helpers.interpolate = function (str, data) {
  str = typeof str === "string" && str.length > 0 ? str : false;
  data = typeof data === "object" && data != null ? data : {};

  // Add the template objects to the data object, prepending their key name with "global"
  for (var keyName in config.templateGlobals) {
    if (config.templateGlobals.hasOwnProperty(keyName)) {
      data["global." + keyName] = config.templateGlobals[keyName];
    }
  }

  // For each key in the data object, insert its value in to the string at the corresponding placeholder
  for (var key in data) {
    if (data.hasOwnProperty(key) && typeof data[key] === "string") {
      var replaceValue = data[key];
      var find = "{" + key + "}";
      str = str.replace(find, replaceValue);
    }
  }

  return str;
};

// Get cotents of a static (public) asset
helpers.getStaticAssets = function (fileName, callback) {
  // Validate file name
  fileName =
    typeof fileName === "string" && fileName.length > 0 ? fileName : false;
  if (fileName) {
    var publicDir = path.join(__dirname, "/../public/");
    fs.readFile(publicDir + fileName, "utf-8", function (err, assetData) {
      if (!err && assetData) {
        callback(false, assetData);
      } else {
        callback("No asset file could be found by the file name: ", fileName);
      }
    });
  } else {
    callback("A valid file name not specified");
  }
};
// Export the module
module.exports = helpers;
