const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'apicrud'
});
db.connect((err) => {
  if (err) throw err;
  else {
    console.log('Database connected....');
  }
});
module.exports = db;
