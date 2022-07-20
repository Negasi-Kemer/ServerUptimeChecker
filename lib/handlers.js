/**
 * Request handlers
 */

// Dependencies
var _data = require("./data");
const { hash } = require("./helpers");
var helpers = require("./helpers");
var config = require("./config");

// Define handlers
var handlers = {};

/**
 * HTML handlers
 */

// Index handler
handlers.index = function (data, callback) {
  // Restric a request to be only a GET method
  if (data.method === "get") {
    // Prepare data for interpolation
    var templateData = {
      "head.title": "Uptime Monitoring - Made Simple",
      "head.description":
        "We offer free simple up-time monitoring for HTTP/HTTPS sites of all kinds. When your site goes down  we'll send you a text to let you know",
      "body.class": "index",
    };
    // Read in a template as string
    helpers.getTemplates("index", templateData, function (err, str) {
      if (!err && str) {
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

// Create account handler
handlers.accountCreate = function (data, callback) {
  // Restric a request to be only a GET method
  if (data.method === "get") {
    // Prepare data for interpolation
    var templateData = {
      "head.title": "Create an Account",
      "head.description": "Signup Now. You're just few seconds away. ",
      "body.class": "accountCreate",
    };
    // Read in a template as string
    helpers.getTemplates("accountCreate", templateData, function (err, str) {
      if (!err && str) {
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

// Create new session
handlers.sessionCreate = function (data, callback) {
  // Restric a request to be only a GET method
  if (data.method === "get") {
    // Prepare data for interpolation
    var templateData = {
      "head.title": "Login to your account",
      "head.description":
        "Please enter phone number and password to access your account. ",
      "body.class": "sessionCreate",
    };
    // Read in a template as string
    helpers.getTemplates("sessionCreate", templateData, function (err, str) {
      if (!err && str) {
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

// Edit your account
handlers.accountEdit = function (data, callback) {
  // Restric a request to be only a GET method
  if (data.method === "get") {
    // Prepare data for interpolation
    var templateData = {
      "head.title": "Account Settings",
      "body.class": "accountEdit",
    };
    // Read in a template as string
    helpers.getTemplates("accountEdit", templateData, function (err, str) {
      if (!err && str) {
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

// Create a new check
handlers.checksCreate = function (data, callback) {
  // Restric a request to be only a GET method
  if (data.method === "get") {
    // Prepare data for interpolation
    var templateData = {
      "head.title": "Creare a new check",
      "body.class": "checksCreate",
    };
    // Read in a template as string
    helpers.getTemplates("checksCreate", templateData, function (err, str) {
      if (!err && str) {
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

// Account has been deleted
handlers.accountDeleted = function (data, callback) {
  // Restric a request to be only a GET method
  if (data.method === "get") {
    // Prepare data for interpolation
    var templateData = {
      "head.title": "Account Deleted",
      "head.description": "Your account has been deleted",
      "body.class": "accountDeleted",
    };
    // Read in a template as string
    helpers.getTemplates("accountDeleted", templateData, function (err, str) {
      if (!err && str) {
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

// Dashboard (View checks)
handlers.checksList = function (data, callback) {
  // Restric a request to be only a GET method
  if (data.method === "get") {
    // Prepare data for interpolation
    var templateData = {
      "head.title": "Dashboard",
      "head.description": "All you checks are listed below",
      "body.class": "checksList",
    };
    // Read in a template as string
    helpers.getTemplates("checksList", templateData, function (err, str) {
      if (!err && str) {
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

// Edit a check
handlers.checksEdit = function (data, callback) {
  // Restric a request to be only a GET method
  if (data.method === "get") {
    // Prepare data for interpolation
    var templateData = {
      "head.title": "Check Detials",
      "head.description": "Checks edit ",
      "body.class": "checksEdit",
    };
    // Read in a template as string
    helpers.getTemplates("checksEdit", templateData, function (err, str) {
      if (!err && str) {
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

// Session has been deleted
handlers.sessionDeleted = function (data, callback) {
  // Restric a request to be only a GET method
  if (data.method === "get") {
    // Prepare data for interpolation
    var templateData = {
      "head.title": "Logged Out",
      "head.description": "You have been logged out of your account . ",
      "body.class": "sessionDeleted",
    };
    // Read in a template as string
    helpers.getTemplates("sessionDeleted", templateData, function (err, str) {
      if (!err && str) {
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

// Favicon
handlers.favicon = function (data, callback) {
  // Reject any request that isn't GET method
  if (data.method === "get") {
    // Read in the favicon file
    helpers.getStaticAssets("favicon.ico", function (err, faviconData) {
      if (!err && faviconData) {
        // Callback the faviconData
        callback(200, faviconData, "favicon");
      } else {
        callback(500);
      }
    });
  } else {
    callback(405);
  }
};

// Public sssets
handlers.public = function (data, callback) {
  // Reject any request that isn't GET method
  if (data.method === "get") {
    // Get the file name being requested
    var trimmedAssetName = data.trimmedPath.replace("public/", "").trim();
    if (trimmedAssetName.length > 0) {
      // Read in the asset's data
      helpers.getStaticAssets(trimmedAssetName, function (err, assetData) {
        if (!err && assetData) {
          // Determine content type of the asset data or default to plain text
          var contentType = "plain";
          if (trimmedAssetName.indexOf(".png") > -1) {
            contentType = "png";
          }
          if (trimmedAssetName.indexOf(".css") > -1) {
            contentType = "css";
          }
          if (trimmedAssetName.indexOf(".jpg") > -1) {
            contentType = "jpg";
          }
          if (trimmedAssetName.indexOf(".ico") > -1) {
            contentType = "favicon";
          }
          // Callback the asset data
          callback(200, assetData, contentType);
        } else {
          callback(404);
        }
      });
    } else {
      callback(404);
    }
  } else {
    callback(405);
  }
};

/**
 * JSON API handlers
 */

handlers.exampleError = function (data, callback) {
  var err = new Error("This is an example error");
  throw err;
};

// Users
handlers.users = function (data, callback) {
  // Acceptable http method
  var acceptableMethods = ["get", "post", "put", "delete"];

  // Check the http method passed by the user is acceptable
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._users[data.method](data, callback);
  } else {
    callback(405, { Error: "Unacceptable http method" });
  }
};

// Container for Users submethod
handlers._users = {};

// Users post
// Required data: firstName, lastName, phone, password, tosAgreement
// Optional data: none
handlers._users.post = function (data, callback) {
  // Check all required fields
  var firstName =
    typeof data.payload.firstName == "string" &&
    data.payload.firstName.trim().length > 0
      ? data.payload.firstName.trim()
      : false;

  var lastName =
    typeof data.payload.lastName == "string" &&
    data.payload.lastName.trim().length > 0
      ? data.payload.lastName.trim()
      : false;

  var phone =
    typeof data.payload.phone == "string" &&
    data.payload.phone.trim().length == 10
      ? data.payload.phone.trim()
      : false;

  var password =
    typeof data.payload.password == "string" &&
    data.payload.password.trim().length > 0
      ? data.payload.password.trim()
      : false;

  var tosAgreement =
    typeof data.payload.tosAgreement == "boolean" &&
    data.payload.tosAgreement == true
      ? true
      : false;
  if (firstName && lastName && phone && password && tosAgreement) {
    // Check the user doesn't exist
    _data.read("users", phone, function (err, data) {
      if (err) {
        // Hash the password
        var hashedPassword = helpers.hash(password);

        // Check hashed password created successfully
        if (hashedPassword) {
          // Create the user object
          var userObject = {
            firstName,
            lastName,
            phone,
            password: hashedPassword,
            tosAgreement: true,
          };

          _data.create("users", phone, userObject, function (err) {
            if (!err) {
              callback(200, { Sucess: "File Created Successfully" });
            } else {
              callback(500, { Error: "Could not create the new user" });
            }
          });
        } else {
          callback(500, { Error: "Could not hash user's password " });
        }
      } else {
        callback(400, { Error: "User already exists" });
      }
    });
  } else {
    callback(400, { Error: "Please fill all required fields" });
  }
};

// Users get
// Required data: phone
// Optional data: none
handlers._users.get = function (data, callback) {
  // Validate phone
  var phone =
    typeof data.queryStringObject.phone === "string" &&
    data.queryStringObject.phone.trim().length == 10
      ? data.queryStringObject.phone.trim()
      : false;

  if (phone) {
    var token =
      typeof data.headers.token == "string" ? data.headers.token : false;

    // Verify the token
    handlers._tokens.verifyToken(token, phone, function (tokenIsValid) {
      if (tokenIsValid) {
        // Look up the user
        _data.read("users", phone, function (err, data) {
          if (!err && data) {
            // Remove the hashed password before returning to the requester
            delete data.password;
            callback(200, data);
          } else {
            callback(404, { Error: "User not found" });
          }
        });
      } else {
        callback(403, { Error: "Token or phone is invaid" });
      }
    });
  } else {
    callback(400, { Error: "Phone number is required" });
  }
};

// Users put
// Required data: phone
// Optional data: firstName, lastName, password - atleast one of them must be filled
handlers._users.put = function (data, callback) {
  // Required field
  var phone =
    typeof data.payload.phone == "string" &&
    data.payload.phone.trim().length == 10
      ? data.payload.phone.trim()
      : false;

  // Optional data
  var firstName =
    typeof data.payload.firstName == "string" &&
    data.payload.firstName.trim().length > 0
      ? data.payload.firstName.trim()
      : false;

  var lastName =
    typeof data.payload.lastName == "string" &&
    data.payload.lastName.trim().length > 0
      ? data.payload.lastName.trim()
      : false;

  var password =
    typeof data.payload.password == "string" &&
    data.payload.password.trim().length > 0
      ? data.payload.password.trim()
      : false;

  // Chek phone number
  if (phone) {
    if (firstName || lastName || password) {
      var token =
        typeof data.headers.token == "string" ? data.headers.token : false;
      // Verify the token
      handlers._tokens.verifyToken(token, phone, function (tokenIsValid) {
        if (tokenIsValid) {
          // Find user
          _data.read("users", phone, function (err, userData) {
            if (!err && userData) {
              if (firstName) userData.firstName = firstName;

              if (lastName) userData.lastName = lastName;

              if (password) userData.password = helpers.hash(password);

              _data.update("users", phone, userData, function (err) {
                if (!err) {
                  callback(200, { updatedUserData: userData });
                } else {
                  callback(500, { Error: "Error updating user data" });
                }
              });
            } else {
              callback(400, { Error: "User does not exist" });
            }
          });
        } else {
          callback(403, { Error: "Token or phone is invaid" });
        }
      });
    } else {
      callback(400, { Error: "At least one field must be provided" });
    }
  } else {
    callback(400, { Error: "Phone number is required and must be valid" });
  }
};

// Users delete
// Required data: phone
handlers._users.delete = function (data, callback) {
  // Validate phone
  var phone =
    typeof data.queryStringObject.phone === "string" &&
    data.queryStringObject.phone.trim().length == 10
      ? data.queryStringObject.phone.trim()
      : false;

  if (phone) {
    var token =
      typeof data.headers.token == "string" ? data.headers.token : false;
    // Verify the token
    handlers._tokens.verifyToken(token, phone, function (tokenIsValid) {
      if (tokenIsValid) {
        // Look up the user
        _data.read("users", phone, function (err, data) {
          if (!err && data) {
            _data.delete("users", phone, function (err) {
              if (!err) {
                // Delete each of the checks associated witht the user
                var userChecks =
                  typeof data.checks === "object" &&
                  data.checks instanceof Array
                    ? data.checks
                    : [];
                var userChceksLength = userChecks.length;
                // Check if user has at least 1 checks
                if (userChceksLength > 0) {
                  userChecks.forEach(myFunction);
                  var checksDeleted = 0;
                  var deletionErrors = false;
                  // myFunction
                  function myFunction(checkId) {
                    _data.delete("checks", checkId, function (err) {
                      if (err) {
                        deletionErrors = true;
                      }
                      checksDeleted++;
                      if (checksDeleted === userChceksLength) {
                        if (!deletionErrors) {
                          callback(200);
                        } else {
                          callback(500, {
                            Error: "Could not delete check " + checkId,
                          });
                        }
                      }
                    });
                  }
                } else {
                  callback(200, {
                    Success: "User deleted",
                  });
                }
              } else {
                callback(500, { Eroor: "Error while deleting user" });
              }
            });
          } else {
            callback(404, { Error: "User not found" });
          }
        });
      } else {
        callback(403, { Error: "Token or phone is invaid" });
      }
    });
  } else {
    callback(400, { Error: "Phone number is required" });
  }
};

// Tokens
handlers.tokens = function (data, callback) {
  // Acceptable http method
  var acceptableMethods = ["get", "post", "put", "delete"];

  // Check the http method passed by the user is acceptable
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._tokens[data.method](data, callback);
  } else {
    callback(405, { Error: "Unacceptable http method" });
  }
};

// Container for all tokens
handlers._tokens = {};

// Token - Post
// Required data: phone and password
// Optional data: none
handlers._tokens.post = function (data, callback) {
  var phone =
    typeof data.payload.phone == "string" &&
    data.payload.phone.trim().length == 10
      ? data.payload.phone.trim()
      : false;

  var password =
    typeof data.payload.password == "string" &&
    data.payload.password.trim().length > 0
      ? data.payload.password.trim()
      : false;

  if (phone && password) {
    // Look up the user using the phone number
    _data.read("users", phone, function (err, userData) {
      if (!err && userData) {
        // Hash the passsword and compare it with the user's password
        var hashedPassword = helpers.hash(password);
        if (hashedPassword === userData.password) {
          // Create token with a 1 hour expiration time
          var id = helpers.createRandomString(20);
          var expires = Date.now() + 1000 * 60 * 60 * 24;

          // Token object
          var tokenObject = {
            phone,
            id,
            expires,
          };

          // Create the token
          _data.create("token", id, tokenObject, function (err) {
            if (!err) {
              callback(200, tokenObject);
            } else {
              callback(500, { Error: "Error creating token file" });
            }
          });
        } else {
          callback(403, { Error: "Phone or password incorrect" });
        }
      } else {
        callback(404, { Error: "User not found" });
      }
    });
  } else {
    callback(400, { Error: "Phone and password are required" });
  }
};

// Token - Get
// Required data: tokenId
// Optional data: none
handlers._tokens.get = function (data, callback) {
  // Validate tokenId
  var id =
    typeof data.queryStringObject.id === "string" &&
    data.queryStringObject.id.trim().length == 20
      ? data.queryStringObject.id.trim()
      : false;

  if (id) {
    // Look up the token
    _data.read("token", id, function (err, tokenData) {
      if (!err && tokenData) {
        // Remove the hashed password before returning to the requester
        delete data.password;
        callback(200, tokenData);
      } else {
        callback(404, { Error: "Token not found" });
      }
    });
  } else {
    callback(400, { Error: "Token id is required" });
  }
};

// Token - Pull (Extend the expiration time)
// Required data: tokenId, extend
// Optional data: none
handlers._tokens.put = function (data, callback) {
  // Validate tokenId and 'extends'
  var id =
    typeof data.payload.id === "string" && data.payload.id.trim().length == 20
      ? data.payload.id.trim()
      : false;

  var extend =
    typeof data.payload.extend === "boolean" && data.payload.extend == true
      ? true
      : false;

  if (id && extend) {
    // Look up the token
    _data.read("token", id, function (err, tokenData) {
      if (!err && tokenData) {
        // Check tokenId is not expired
        if (tokenData.expires > Date.now()) {
          // Extend tokenId expiration by 1 hour
          tokenData.expires = Date.now() + 1000 * 60 * 60;
          // Update tokenId
          _data.update("token", id, tokenData, function (err) {
            if (!err) {
              callback(200, { Success: tokenData });
            } else {
              callback(500, { Error: "Error updating the tokenId file" });
            }
          });
        } else {
          callback(400, { Error: "Opps, tokenId has expired" });
        }
      } else {
        callback(404, { Error: "Token not found" });
      }
    });
  } else {
    callback(400, { Error: "Token and extend are required" });
  }
};

// Token - Delete
// Required data: tokenId
// Optional data: none
handlers._tokens.delete = function (data, callback) {
  // Validate tokenId
  var id =
    typeof data.queryStringObject.id === "string" &&
    data.queryStringObject.id.trim().length == 20
      ? data.queryStringObject.id.trim()
      : false;

  if (id) {
    // Look up the token
    _data.read("token", id, function (err, data) {
      if (!err && data) {
        _data.delete("token", id, function (err) {
          if (!err) {
            callback(200, { Sucess: "Token deleted successfully" });
          } else {
            callback(500, { Eroor: "Error while deleting token" });
          }
        });
      } else {
        callback(404, { Error: "Token not found" });
      }
    });
  } else {
    callback(400, { Error: "Token Id is required" });
  }
};

// Verify a given token is valid for that user
handlers._tokens.verifyToken = function (tokenId, phone, callback) {
  _data.read("token", tokenId, function (err, data) {
    if (!err && data) {
      // Check phone number
      if (data.phone == phone && data.expires > Date.now()) {
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  });
};

// Checks
handlers.checks = function (data, callback) {
  // Acceptable http method
  var acceptableMethods = ["get", "post", "put", "delete"];
  // Check the http method passed by the user is acceptable
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._checks[data.method](data, callback);
  } else {
    callback(405, { Error: "Unacceptable http method" });
  }
};

// Container for all the checks methods
handlers._checks = {};

// Checks - post
// Required data: protocol, method, url, successCodes, timeOutSeconds
handlers._checks.post = function (data, callback) {
  // Validate inputs
  var protocol =
    typeof data.payload.protocol === "string" &&
    ["http", "https"].indexOf(data.payload.protocol) > -1
      ? data.payload.protocol
      : false;

  var method =
    typeof data.payload.method === "string" &&
    ["post", "get", "put", "delete"].indexOf(data.payload.method) > -1
      ? data.payload.method
      : false;

  var url =
    typeof data.payload.url === "string" && data.payload.url.trim().length > 0
      ? data.payload.url.trim()
      : false;

  var successCodes =
    typeof data.payload.successCodes === "object" &&
    data.payload.successCodes instanceof Array &&
    data.payload.successCodes.length > 0
      ? data.payload.successCodes
      : false;

  var timeOutSeconds =
    typeof data.payload.timeOutSeconds === "number" &&
    data.payload.timeOutSeconds % 1 === 0 &&
    data.payload.timeOutSeconds >= 1 &&
    data.payload.timeOutSeconds <= 5
      ? data.payload.timeOutSeconds
      : false;

  if (protocol && method && url && successCodes && timeOutSeconds) {
    // Validate and find token
    var tokenId =
      typeof data.headers.token === "string" ? data.headers.token : false;
    _data.read("token", tokenId, function (err, tokenData) {
      if (!err && tokenData) {
        var userPhone = tokenData.phone;
        // Look up the user
        _data.read("users", userPhone, function (err, userData) {
          if (!err && userData) {
            var userChecks =
              typeof userData.checks === "object" &&
              userData.checks instanceof Array
                ? userData.checks
                : [];
            // Verify if the user has less than 5 checks - max allowed
            if (userChecks.length < config.maxChecks) {
              // Create random string for check id
              var id = helpers.createRandomString(20);

              // Create check object
              var checkObject = {
                id,
                userPhone,
                protocol,
                method,
                url,
                successCodes,
                timeOutSeconds,
              };

              // Create checks
              +_data.create("checks", id, checkObject, function (err) {
                if (!err) {
                  // Add check to 'userChecks' array
                  userData.checks = userChecks;
                  userData.checks.push(id);

                  // Update user data
                  _data.update("users", userPhone, userData, function (err) {
                    if (!err) {
                      callback(200, checkObject);
                    } else {
                      callback(500, { Error: "Could not update user data" });
                    }
                  });
                } else {
                  callback(500, {
                    Error: "Error happened creating check file",
                  });
                }
              });
            } else {
              callback(400, {
                Error:
                  "You have reached maximum allowed checks(" +
                  config.maxChecks +
                  ")",
              });
            }
          } else {
            callback(403);
          }
        });
      } else {
        callback(403, { Error: "Forbidden" });
      }
    });
  } else {
    callback(400, { Error: "Please fill all required fields" });
  }
};

// Checks - get
handlers._checks.get = function (data, callback) {
  // Check's Id
  var checks =
    typeof data.queryStringObject.id === "string" &&
    data.queryStringObject.id.length == 20
      ? data.queryStringObject.id
      : false;

  if (checks) {
    // Look up the check
    _data.read("checks", checks, function (err, checkData) {
      if (!err && checkData) {
        // Token
        var token =
          typeof data.headers.token === "string" ? data.headers.token : false;
        handlers._tokens.verifyToken(
          token,
          checkData.userPhone,
          function (tokenIsValid) {
            if (tokenIsValid) {
              // Return check data
              callback(200, checkData);
            } else {
              callback(403, { Error: "Invalid token" });
            }
          }
        );
      } else {
        callback(404, { Error: "Check not found" });
      }
    });
  } else {
    callback(400, { Error: "Check Id is required" });
  }
};

// Checks - put
// Required data: check id
// Optional data: protocol, url, method, timeOutSeconds, successCodes
handlers._checks.put = function (data, callback) {
  // Check id
  var checkId =
    typeof data.payload.id === "string" && data.payload.id.trim().length == 20
      ? data.payload.id
      : false;

  // Validate optional inputs
  var protocol =
    typeof data.payload.protocol === "string" &&
    ["http", "https"].indexOf(data.payload.protocol) > -1
      ? data.payload.protocol
      : false;

  var method =
    typeof data.payload.method === "string" &&
    ["post", "get", "put", "delete"].indexOf(data.payload.method) > -1
      ? data.payload.method
      : false;

  var url =
    typeof data.payload.url === "string" && data.payload.url.trim().length > 0
      ? data.payload.url.trim()
      : false;

  var successCodes =
    typeof data.payload.successCodes === "object" &&
    data.payload.successCodes instanceof Array &&
    data.payload.successCodes.length > 0
      ? data.payload.successCodes
      : false;

  var timeOutSeconds =
    typeof data.payload.timeOutSeconds === "number" &&
    data.payload.timeOutSeconds % 1 === 0 &&
    data.payload.timeOutSeconds >= 1 &&
    data.payload.timeOutSeconds <= 5
      ? data.payload.timeOutSeconds
      : false;

  if (checkId) {
    // Check if one of the optional data is provided
    if (protocol || url || method || timeOutSeconds || successCodes) {
      // Look up the check
      _data.read("checks", checkId, function (err, checkData) {
        if (!err && checkData) {
          // Get token from header and verify it
          var token =
            typeof data.headers.token === "string" ? data.headers.token : false;

          handlers._tokens.verifyToken(
            token,
            checkData.userPhone,
            function (tokenIsValid) {
              if (tokenIsValid) {
                if (protocol) {
                  checkData.protocol = protocol;
                }
                if (url) {
                  checkData.url = url;
                }
                if (method) {
                  checkData.method = method;
                }
                if (timeOutSeconds) {
                  checkData.timeOutSeconds = timeOutSeconds;
                }
                if (successCodes) {
                  checkData.successCodes = successCodes;
                }

                // Update checks
                _data.update("checks", checkId, checkData, function (err) {
                  if (!err) {
                    callback(200, checkData);
                  } else {
                    callback(500, { Error: "Could not update checks" });
                  }
                });
              } else {
                callback(403, { Error: "Invalid or expired token" });
              }
            }
          );
        } else {
          callback(404, { Error: "Check not found" });
        }
      });
    } else {
      callback(400, { Error: "At least one field must be provided" });
    }
  } else {
    callback(400, { Error: "Check id is required" });
  }
};

// Checks - delete
// Required data: checkId
handlers._checks.delete = function (data, callback) {
  // Check id
  var checkId =
    typeof data.queryStringObject.id === "string" &&
    data.queryStringObject.id.length == 20
      ? data.queryStringObject.id
      : false;

  if (checkId) {
    // Look up the checks
    _data.read("checks", checkId, function (err, checkData) {
      if (!err && checkData) {
        // Token
        var token =
          typeof data.headers.token === "string" ? data.headers.token : false;

        // Verify
        handlers._tokens.verifyToken(
          token,
          checkData.userPhone,
          function (tokenIsValid) {
            if (tokenIsValid) {
              // Delete check
              _data.delete("checks", checkId, function (err) {
                if (!err) {
                  // Look up the user
                  _data.read(
                    "users",
                    checkData.userPhone,
                    function (err, userData) {
                      if (!err && userData) {
                        // Get index of the check from the user data
                        var checkIdIndex = userData.checks.indexOf(checkId);
                        // Remove that check id
                        userData.checks.splice([checkIdIndex], 1);

                        // Update user data
                        _data.update(
                          "users",
                          userData.phone,
                          userData,
                          function (err) {
                            if (!err) {
                              callback(200, userData);
                            } else {
                              callback(500, {
                                Error: "Could not remove check id from user",
                              });
                            }
                          }
                        );
                      } else {
                        callback(404, { Error: "User not found" });
                      }
                    }
                  );
                } else {
                  callback(500, { Error: "Could not delete check" });
                }
              });
            } else {
              callback(403, { Error: "Invalid or expired token" });
            }
          }
        );

        // Remove
      } else {
        callback(404, { Error: "Check not found" });
      }
    });
  } else {
    callback(400, { Error: "Check id is required" });
  }
};
handlers.ping = function (data, callback) {
  callback(200);
};

handlers.notfound = function (data, callback) {
  callback(404, { Error: "Unknown URL" });
};

// Export
module.exports = handlers;
