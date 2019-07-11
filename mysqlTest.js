var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'ksh2580145',
  database : 'nodejs_login'
});
 
connection.connect();
 
// connection.query(`INSERT INTO users values(333, "hello", "world")`, function (error, results, fields) {
//     if (error) throw error;
//     console.log(results);
//   });

connection.query('SELECT * from users', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});

var myid = '333';
connection.query(`SELECT * FROM users WHERE id = ${myid}`, function(err, results, fields){
    if (err) throw err;
  console.log(results);
});

