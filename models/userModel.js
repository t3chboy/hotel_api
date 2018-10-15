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

exports.delete = ( req ) =>{

	return new Promise( ( resolve , reject )=>{

	exports.exists( req ).then( (result) => {
		if( result.length == 1 ){
			return true;
		}
	}).then( () => {
			
		return new Promise( ( resolve , reject)=> {

			const deleteRowId = [ req.params.userId ];
			const deleteQuery = "UPDATE user_master set STATUS = '0' where id = ? ";
			
			mysqlService.connect().query( deleteQuery, deleteRowId ,( error , results )=>{
				if( error ) return reject(error);
				if( results.affectedRows == 1 ){
		
					return resolve( 'Deleted successfully.' );
				}
			});	
		});

	}).then(( result )=>{
		return resolve( result );
	}).catch( (error)=> {
		return reject( error );
	});

	});
}

exports.update = ( req ) =>{

	return new Promise( ( resolve , reject )=>{

		exports.exists( req ).then((result)=>{
			if( result.length == 1 ){

				return new Promise((resolve,reject)=>{

					const whereClause = {
						id : req.params.userId
					}

					const updateData = req.body;
					
					const updateQuery = "UPDATE user_master set ? where ? ";

					mysqlService.connect().query( updateQuery , [ updateData , whereClause ] , ( error ,  results ,fields ) =>{
						if( error ) return reject(error);
						if( results.affectedRows == 1 ){
							return resolve( 'Updated successfully');
						}

					});


				})
			}

		}).then((result)=>{
			return resolve(result);
		}).catch((error)=>{
			return reject(error);
		})
	});
}



exports.exists = ( req ) => {

	return new Promise( ( resolve , reject )=>{

		const selectQuery = "select id from user_master where ? AND ? ";
		
		mysqlService.connect().query( selectQuery , [ req.params.userId , 1 ] ,( error ,  results , fields )=>{
			console.log( mysqlService.connect().query() );
			if( error ){
				return reject( error );
			}else if( results.length == 0 ){
				console.log("awdawd");
				return reject("User Not Found");
			} else{
				return resolve( results );
			}

		});

	});

}
