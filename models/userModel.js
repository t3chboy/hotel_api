const mysqlService = require('../services/mysql_service');


exports.create = ( req , res ) =>{
	console.log( req.body );

	const userData = [ req.body.name, req.body.age, req.body.city ];

	const insertQuery = "INSERT INTO user_master ( name , age , city ) values ( ? , ? , ? ) ";
	//mysqlService.connect() ;
	mysqlService.connect().query( insertQuery , userData , ( error , results, fields )=>{
		if( error ) throw error;
		console.log( results );

		if( results.affectedRows == 1 ){
			res.status(200); 
			res.type('json'); 
			res.send({"message":'Created successfully'});
		}
	})
}

exports.delete = ( req , res ) =>{

	return new Promise( ( resolve , reject ) =>{
		exports.exists( req , ( error , result ) =>{
			
				return resolve( result );
			
		});
	}).then( ( data)=>{
		
		if( data.length == 1 ){

			//logic to soft delete user
			const deleteRowId = [ req.params.userId ];
			const deleteQuery = "UPDATE user_master set STATUS = '0' where id = ? ";
			console.log("38");

			mysqlService.connect().query( deleteQuery, deleteRowId ,( error , results , fields )=>{
				if( error ) throw error;
				if( results.affectedRows == 1 ){
					return {'status': true , "message" : 'Delete successfully' };
				}
			});	
			console.log("45");	

		}else{
			throw("User Doesnot exists pppopppo");
		}	

	}).catch( (error )=>{
		return {'status': false , "message" : `${error}` };
	});	



}

exports.update = ( req , res ) => {

	return new Promise( ( resolve , reject ) =>{
		exports.exists( req , ( error , result ) =>{
			if( error ) return reject( error );
			else{
				resolve( result );
			}
		});
	}).then( ( data)=>{

		if( data.length == 1 ){
			
			const whereClause = {
				id : req.params.userId
			}

			const updateData = req.body;
			
			const updateQuery = "UPDATE user_master set ? where ? ";

			mysqlService.connect().query( updateQuery , [ updateData , whereClause ] , ( error ,  results ,fields ) =>{
				if( error ) throw error;
				if( results.affectedRows == 1 ){
					res.status(200); 
					res.type('json'); 
					res.send({"message":'Updated successfully'});
				}

			});


		}else{
			throw("User Does not exists");
		}
	}).catch( (error )=>{
		res.status(400); 
		res.type('json'); 
		res.send({"message":`${error}`});
	});

}

exports.exists = ( req , callback ) => {

	const whereClause = {
		id : req.params.userId
	}

	const selectQuery = "select id from user_master where ? ";

	mysqlService.connect().query( selectQuery , whereClause ,( error ,  results )=>{

		if( error ){
			return callback( error );
		}else{
			return callback(null,results )
		}

	});
	
}
