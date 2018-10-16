const mysql = require('mysql');

console.log('mysql service');

/**
 * [connect This will create pool of connectino to be used later]
 * @return {[type]} [DB connection pool object]
 */
exports.connect = ()=>{
	
	const poolConnection = mysql.createPool({
		  connectionLimit : 100,
		  host     : process.env.MYSQL_DB_HOST,
		  user     : process.env.MYSQL_DB_USERNAME,
		  password : process.env.MYSQL_DB_PASSWORD,
		  database : process.env.MYSQL_DB_NAME
	});

	poolConnection.getConnection( ( err , connection ) =>{

		if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }

    if( connection ) connection.release();

	});

	return poolConnection;
}

exports.disconnect = () => {
	

}
