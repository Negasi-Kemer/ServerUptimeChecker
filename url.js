// var url = require("url").URL;

const myUrl = new URL(
  "http://localhost:8080/default.htm/negasi?year=2017&month=february"
);
// myUrl.port = "5555";
console.log(myUrl);
console.log(`manipulated port: ${myUrl.port}`);
