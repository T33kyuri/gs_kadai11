const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "Mr.9ri_mysql",
  database: "todos_db",
});

// 接続確認のためのコンソールログ
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed: ', err.message);
  } else {
    console.log('Connected to the database');
    connection.release(); // 接続を解放
  }
});

module.exports = pool;

// -----------------------------------------------------------
// const mysql = require('mysql');

// const pool = mysql.createPool({
//   connectionLimit: 10,
//   host: 'localhost',
//   user: 'root',
//   password: 'Mr.9ri_mysql',
//   database: 'todos_db',
// });


// module.exports = pool;
