// routes/api.js
const express = require('express');
const router = express.Router();
const pool = require('../db/connection');



router.get("/", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("MYSQLとの接続エラー", err);
      return res.status(500).send(err);
    }
    console.log("MYSQLと接続中");

    connection.query("SELECT * FROM todos2", (err, rows) => {
      connection.release();
      if (err) {
        console.error("データの取得エラー", err);
        return res.status(500).send(err);
      }
      console.log(rows);
      res.render("home", { rows });
    });
  });
});

router.post("/", (req, res) => {

  // フォームデータを受け取る
  // const hyouka_day = req.body.hyouka_day;
  const hyouka_relationship = req.body.hyouka_relationship;
  const hyouka_content_1 = req.body.hyouka_content_1;

    // 現在の日時を取得
    const currentDate = new Date();
  
    // MySQLに保存するためのフォーマットに変換
    const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');  

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("MYSQLとの接続エラー", err);
      return res.status(500).send(err);
    }
    console.log("MYSQLと接続中");
    connection.query(
      "INSERT INTO todos2 (hyouka_day, hyouka_relationship, hyouka_content_1) VALUES (?, ?, ?)",
      [formattedDate, hyouka_relationship, hyouka_content_1],
      (err, result) => {
      connection.release();
      if (!err) {
        res.redirect("/");
      } else {
        console.log(err);
        return res.status(500).send(err);
      }
    });
  });
});

// // Get all todos
// router.get('/todos', (req, res) => {
//   pool.query('SELECT * FROM todos', (err, results) => {
//     if (err) throw err;
//     res.json(results);
//   });
// });

// // Add a new todo
// router.post('/todos', (req, res) => {
//   const { text } = req.body;
//   pool.query('INSERT INTO todos (text) VALUES (?)', [text], (err, result) => {
//     if (err) throw err;
//     res.status(201).json({ id: result.insertId, text });
//   });
// });

module.exports = router;
