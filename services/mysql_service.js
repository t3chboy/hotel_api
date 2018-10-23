const mysql = require('mysql');

console.log('mysql service');
let poolConnection;
/**
 * [connect This will create pool of connectino to be used later]
 * @return {[type]} [DB connection pool object]
 */
connect = ()=>{
	
	poolConnection = mysql.createPool({
		  connectionLimit : 100,
		  host     : process.env.MYSQL_DB_HOST,
		  user     : process.env.MYSQL_DB_USERNAME,
		  password : process.env.MYSQL_DB_PASSWORD,
		  database : process.env.MYSQL_DB_NAME
	});

	return poolConnection;
}

module.exports = connect();
