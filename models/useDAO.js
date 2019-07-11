var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'ksh2580145',
  database : 'nodejs_login'
});
 
connection.connect();

exports.getUserData = function(username, callback){
    //SELECT * FROM users WHERE username = ${username}`
    connection.query(`SELECT * FROM users WHERE username = "${username}"`, 
        function(err, results, fields){
            if (err) throw err;
            console.log('results : ', results);
            callback(results);
        });
    }

    exports.setUserData = function(data, cb) {
        connection.query(`INSERT INTO users values("${data.id}","${data.name}","${data.pw}")`,
        function(err, results, fields){
            if(err) throw err;
            console.log(results);
            cb();
        });
    }



// connection.query(`INSERT INTO users values(333, "hello", "world")`, function (error, results, fields) {
//     if (error) throw error;
//     console.log(results);
//   });
