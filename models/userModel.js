const mysqlService = require('../services/mysql_service');


exports.create = ( req , res ) =>{
	console.log( req.body );

	const userData = [ req.body.name, req.body.age, req.body.city ];

	const insertQuery = "INSERT INTO user_master ( name , age , city ) values ? ? ? ";
	//mysqlService.connect() ;
	mysqlService.connect().query( insertQuery , userData , ( error , results, fields )=>{
		if( error ) throw error;
		console.log( results );
	})
}

exports.delete = ( req , res ) =>{


}

exports.update = ( req , res ) => {


}
