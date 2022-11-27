const mysql = require('mysql');


const connection = mysql.createConnection({
 host: 'localhost',
 user: 'root',
 password: '',
 database: 'email_service'
});



connection.connect(function (err) {
 if (err) throw err;
 console.log('Connection to datasource successful');
}
);




module.exports = connection;