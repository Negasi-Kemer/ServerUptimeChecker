// var url = require("url");
// var adr = "http://localhost:8080/default.htm/negasi?year=2017&month=february";
// //Parse the address:
// var q = url.parse(adr, true);

const { fstat } = require("fs");

// /*The parse method returns an object containing url properties*/
// q.port = "8080";
// console.log(q);
// console.log(q.port);
// console.log(q.query);
// // console.log(q.pathname);
// // console.log(q.search);

// /*The query property returns an object with all the querystring parameters as properties:*/
// var qdata = q.query;
// // console.log(qdata.month);

// var router = {
//   hyab: "Negasi",
//   alu: "Fili",
//   fiyori: "Dani",
// };

// var wife = "alu";
// console.log(router.wife);

// Node.js program to demonstrate the
// fs.truncate() method

// // Include the fs module
var fs = require("fs");
var path = require("path");
// // Completely delete the content
// // of the targeted file
// var filePath = path.join(__dirname, "./teacherdocx.docx");
// console.log(filePath);
// fs.truncate(filePath, function (err) {
//   if (err) {
//     console.log(`Error while truncating file: ${err}`);
//   } else {
//     console.log("File Content Deleted");
//   }
// });

// Read directory
// fs.readdir(
//   path.join(__dirname, "/.data/token/"),
//   { withFileTypes: true },
//   (err, files) => {
//     if (err) {
//       console.log(err);
//     } else {
//       files.forEach((file) => console.log(file.name.replace(".json", "")));
//     }
//   }
// );
// var temp = {
//   name: "Negasi",
//   age: 26,
//   address: "Gerji",
// };
// temp.hyab = temp;
// console.log(JSON.stringify(temp));
// var a = { y: 10 };
// a.x = a;
// console.log(JSON.stringify(a));
// var arr = [1, "tur", { x: 2 }, [3, 4]];
// delete arr[1];
// console.log(arr);
let pers = ["name", "Ahmed"];
const memeber = pers;
pers = null;
console.log(memeber);
console.log(pers);
