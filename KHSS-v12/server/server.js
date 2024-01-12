const express = require("express");
const app = express();
const mysql = require("mysql");
const { engine } = require("express-handlebars");


const apiRouter = require('./routes/api');


// fsモジュールを読み込み
// const fs = require('fs');


const PORT = 5000;

app.use(express.urlencoded({ extended: true })); // フォームデータを解析するためのミドルウェア

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// '/api' エンドポイントに対するルーターを追加
app.use('/', apiRouter);
app.get('/', apiRouter);


app.listen(PORT, () => {
  console.log("サーバーが起動しました");
});
