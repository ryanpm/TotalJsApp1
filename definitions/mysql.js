var mysql = require('mysql');
var pool  = mysql.createPool({ 
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'newunion_development4' 
});

// override the framework prototype
// use CONFIG files for connection string
F.database = function(callback) {
	return pool.getConnection(callback);
};