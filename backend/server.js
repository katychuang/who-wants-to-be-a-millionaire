const sqlite3 = require('sqlite3').verbose();
const express = require("express");
const app = express();
const router = express.Router();
app.use(express.json());

const port = 3000;

// Start server
app.listen(port, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",port))
});

// open the database
let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});


/*----- Insert here other API endpoints
GET Requests
/questions

POST Requests
/new/question
/new/session
*/

// List all questions in top100 table
app.get("/questions", (req, res, next) => {
  const sql = "SELECT rowid, * FROM questions";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return console.error(err.message);
    }
    res.status(200).json({rows});
  })
});

app.post("/new/question", (req, res) => {
  const sql = `INSERT INTO questions VALUES ('${question_text}', '${answer}', '${options}');`;
  db.all(sql, [], (err, row) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return console.error(err.message);
    }
    console.log("completed request.", sql);
    res.status(200);
  })
});

app.put("/new/session", (req, res) => {
  let now = new Date().toLocaleTimeString();
  const sql = `INSERT INTO sessions VALUES ('${now}', 'false', '0');`;
  db.all(sql, [], (err, row) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return console.error(err.message);
    }
    res.status(200);
  })
});

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});

