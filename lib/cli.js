/**
 * CLI related tasks
 */

// Dependencies
var readLine = require("readline");
var util = require("util");
var debug = util.debuglog("cli");
var events = require("events");
// Inorder to use the events class, extend our own class and create object from that class
class _events extends events {}
var e = new _events();
var os = require("os");
var v8 = require("v8");
var _data = require("./data");
var _log = require("./logs");
var helpers = require("./helpers");

// Instantiate the CLI object
var cli = {};

// Input handlers
e.on("man", function (str) {
  cli.responders.help();
});

e.on("help", function (str) {
  cli.responders.help();
});

e.on("exit", function (str) {
  cli.responders.exit();
});

e.on("stats", function (str) {
  cli.responders.stats();
});

e.on("list users", function (str) {
  cli.responders.listUsers();
});

e.on("more user info", function (str) {
  cli.responders.moreUserInfo(str);
});

e.on("list checks", function (str) {
  // Pass 'str' to get only checks with up or down status if user wants to
  cli.responders.listChecks(str);
});

e.on("more check info", function (str) {
  cli.responders.moreCheckInfo(str);
});

e.on("list logs", function (str) {
  cli.responders.listLogs();
});

e.on("more log info", function (str) {
  cli.responders.moreLogInfo(str);
});

// Responders
cli.responders = {};

// Help
cli.responders.help = function () {
  var commands = {
    exit: "Kill the CLI (and the rest of the application)",
    man: "Show this help page",
    help: "Alias of the 'man' command",
    stats: "Get statistics on the underlying OS and resiurce utilization ",
    "list users": "Show a list of all the registered users in the system",
    "more user info --{userId}": "Show details of a specific user",
    "list checks --up --down":
      "Show all active checks. The '--up' and '--down' flags are optional",
    "more check info --{checkId}": "Shows details of a specific check",
    "list logs": "Show all log files (Only compressed ones)",
    "more log info --{fileName}": "Show details of a specified log file",
  };

  // Show a header for the help page
  cli.horizontalLine();
  cli.centered("CLI MANUAL");
  cli.horizontalLine();
  cli.verticalLine(2);

  // Show each command followed by it description
  for (var key in commands) {
    if (commands.hasOwnProperty(key)) {
      var value = commands[key];
      var line = "\x1b[33m" + key + "\x1b[0m";
      // Put equal white spaces between the command and its description for all commands
      var padding = 60 - line.length;
      for (var i = 0; i < padding; i++) {
        line += " ";
      }
      // Concat the command name (after adding the padding) with its description
      line += value;
      console.log(line); // Print the command and it description
      cli.verticalLine(); // Enter to a new line
    }
  }
  // Add another new line
  cli.verticalLine(1);

  // End with another horizontal line
  cli.horizontalLine();
};

// Create vertical line
cli.verticalLine = function (lines) {
  lines = typeof lines === "number" && lines > 0 ? lines : 1;
  for (var i = 0; i < lines; i++) {
    console.log("");
  }
};

// Create a horizontal line
cli.horizontalLine = function () {
  // Get screen size
  var width = process.stdout.columns;
  var line = "";
  for (i = 0; i < width; i++) {
    line += "-";
  }
  console.log(line);
};

// Create centered text
cli.centered = function (str) {
  str = typeof str === "string" && str.trim().length > 0 ? str : "";

  // Get screen width
  var width = process.stdout.columns;

  // Calculate left padding
  var leftPadding = Math.floor((width - str.length) / 2);

  var line = "";
  for (i = 0; i < leftPadding; i++) {
    line += " ";
  }
  line += str;
  console.log(line);
};

// Exit
cli.responders.exit = function () {
  process.exit(0);
};

// Stats
cli.responders.stats = function () {
  // Stats objec
  var stats = {
    "Load Average": os.loadavg().join(" "),
    "CPU Count": os.cpus().length,
    "Free Memory": os.freemem(),
    "Current Malloced Memory": v8.getHeapStatistics().malloced_memory,
    "Peak Malloced Memory": v8.getHeapStatistics().peak_malloced_memory,
    "Allocated Heap Used (%)": Math.round(
      (v8.getHeapStatistics().used_heap_size /
        v8.getHeapStatistics().total_heap_size) *
        100
    ),
    "Available Heap Allocated (%)": Math.round(
      (v8.getHeapStatistics().total_heap_size /
        v8.getHeapStatistics().heap_size_limit) *
        100
    ),
    Uptime: os.uptime() + " Seconds",
  };

  // Show a header for the stats
  cli.horizontalLine();
  cli.centered("SYSTEM STATISTICS");
  cli.horizontalLine();
  cli.verticalLine(2);

  // Show each stats followed by it description
  for (var key in stats) {
    if (stats.hasOwnProperty(key)) {
      var value = stats[key];
      var line = "\x1b[33m" + key + "\x1b[0m";
      // Put equal white spaces between the stats and its description for all commands
      var padding = 60 - line.length;
      for (var i = 0; i < padding; i++) {
        line += " ";
      }
      // Concat the stats name (after adding the padding) with its description
      line += value;
      console.log(line); // Print the stats and it description
      cli.verticalLine(); // Enter to a new line
    }
  }
  // Add another new line
  cli.verticalLine(1);

  // End with another horizontal line
  cli.horizontalLine();
};

// List users
cli.responders.listUsers = function () {
  _data.getAllFiles("users", function (err, userIds) {
    if (!err && userIds && userIds.length > 0) {
      cli.verticalLine();
      userIds.forEach(function (userId) {
        _data.read("users", userId, function (err, userData) {
          if (!err && userData) {
            var line =
              "Name: " +
              userData.firstName +
              " " +
              userData.lastName +
              " Phone: " +
              userData.phone +
              " Checks: ";

            // Identify whether the user has checks
            var numberOfChecks =
              typeof userData.checks === "object" &&
              userData.checks instanceof Array &&
              userData.checks.length > 0
                ? userData.checks.length
                : 0;

            line += numberOfChecks;
            console.log(line);
            cli.verticalLine();
          }
        });
      });
    }
  });
};

// More user info
cli.responders.moreUserInfo = function (str) {
  // Split the command text to get user id
  var arr = str.split("--");
  var userId =
    typeof arr[1] === "string" && arr[1].trim().length > 0
      ? arr[1].trim()
      : false;

  if (userId) {
    _data.read("users", userId, function (err, userData) {
      if (!err && userData) {
        // Remove the hashed password
        delete userData.password;

        // Print the JSON with text highlightng
        console.dir(userData, { colors: true });
        cli.verticalLine();
      }
    });
  }
};

// List checks
cli.responders.listChecks = function (str) {
  _data.getAllFiles("checks", function (err, checkIdsArray) {
    if (!err && checkIdsArray && checkIdsArray.length > 0) {
      checkIdsArray.forEach(function (checkId) {
        _data.read("checks", checkId, function (err, checkData) {
          var includeChecks = false;
          var lowerString = str.toLowerCase();

          // Get the state or defualt to zero
          var state =
            typeof checkData.state === "string" ? checkData.state : "down";

          // Get the state or default to unknown
          var stateOrUnknown =
            typeof checkData.state === "string" ? checkData.state : "unknown";

          // Check if the user has specified the state. If not, include all the checks
          if (
            lowerString.indexOf(state) > -1 ||
            (lowerString.indexOf("--down") === -1 &&
              lowerString.indexOf("--up") === -1)
          ) {
            var line =
              "ID: " +
              checkData.id +
              " " +
              checkData.method.toUpperCase() +
              " " +
              checkData.protocol +
              "://" +
              checkData.url +
              " State: " +
              stateOrUnknown;
            checkData.method.toUpperCase();

            console.log(line);
            cli.verticalLine();
          }
        });
      });
    }
  });
};

// More check info
cli.responders.moreCheckInfo = function (str) {
  // Split the command text to get check id
  var arr = str.split("--");
  var checkId =
    typeof arr[1] === "string" && arr[1].trim().length > 0
      ? arr[1].trim()
      : false;

  if (checkId) {
    _data.read("checks", checkId, function (err, checkData) {
      if (!err && checkData) {
        cli.verticalLine();
        // Print the JSON with text highlightng
        console.dir(checkData, { colors: true });
        cli.verticalLine();
      }
    });
  }
};

// List logs
cli.responders.listLogs = function () {
  _log.getAllLogs(true, function (err, logFileNamesArray) {
    if (!err && logFileNamesArray && logFileNamesArray.length > 0) {
      cli.verticalLine();
      logFileNamesArray.forEach(function (logFileName) {
        if (logFileName.indexOf("-") > -1) {
          console.log(logFileName);
          cli.verticalLine();
        }
      });
    }
  });
};

// More logs
cli.responders.moreLogInfo = function (str) {
  // Split the command text to get log id
  var arr = str.split("--");
  var logFileName =
    typeof arr[1] === "string" && arr[1].trim().length > 0
      ? arr[1].trim()
      : false;

  if (logFileName) {
    cli.verticalLine();
    _log.decompress(logFileName, function (err, stringData) {
      if (!err && stringData) {
        var arr = stringData.split("\n");
        arr.forEach(function (jsonString) {
          var parsedObj = helpers.parseJsonToObject(jsonString);
          if (parsedObj && jsonString !== "{}") {
            console.dir(parsedObj, { colors: true });
            cli.verticalLine();
          }
        });
      }
    });
  }
};

// Input processor
cli.processInput = function (str) {
  str = typeof str === "string" && str.length > 0 ? str : false;
  // Only process the input if the user actually wrote something. Otherwise ignore it
  if (str) {
    // Codify the unique strings that identify the unique questions allowed to ask.
    var uniqueInputs = [
      "man",
      "help",
      "exit",
      "stats",
      "list users",
      "more user info",
      "list checks",
      "more check info",
      "list logs",
      "more log info",
    ];

    var matchFound = false;

    // Go through the possible inputs, emit an event when a match is found
    uniqueInputs.some(function (input) {
      if (str.toLowerCase().indexOf(input) > -1) {
        matchFound = true;
        // Emit an event matching the unique input, and include the full string given
        e.emit(input, str);
        return true;
      }
    });

    // If no match is found, tell the user to try again
    if (!matchFound) {
      console.log("Oops, unknown command. Try again.");
    }
  }
};

// Init script
cli.init = function () {
  // Send the start message to the console in blue dark color
  console.log("\x1b[34m%s\x1b[0m", "The CLI is running ");

  // Start the interface
  var _interface = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "",
  });

  // Create the initial prompt
  _interface.prompt();

  // Handle each line of input separately
  _interface.on("line", function (str) {
    // Send to the input processor
    cli.processInput(str);

    // Re-initialize the prompt afterwards
    _interface.prompt();

    // If the user stops the CLI, kill the associated process
    _interface.on("close", function () {
      process.exit(0);
    });
  });
};

// Export the module
module.exports = cli;
