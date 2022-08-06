const express = require("express");
const app = express();
const port = 3000;
const connection = require("./database");
const path = require("path");

app.get("/", (req, res) => {
  let sql = "SELECT * FROM sql_hr.employees;";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/firstname", (req, res) => {
  let sql = "SELECT first_name, salary FROM sql_hr.employees;";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  connection.connect(function (err) {
    if (err) throw err;
    console.log("database is connected");
  });
});
