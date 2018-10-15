const userModel = require('../models/userModel');

exports.userCreate = function( req, res ){
	userModel.create( req , res );
};


exports.userUpdate = function( req, res ){
	
	const response = userModel.update( req );

	response.then((result)=>{
		
		res.status(200); 
		res.type('json'); 
		res.send({"message": result });

	}).catch((error)=>{

		res.status(400); 
		res.type('json'); 
		res.send({"message":error});

	});

};

exports.userDelete = function( req, res ){

	const response = userModel.delete( req , res );

	response.then( (result)=>{

		res.status(200); 
		res.type('json'); 
		res.send({"message": result });
	
	}).catch( (error)=> {
	
		res.status(400); 
		res.type('json'); 
		res.send({"message":error});
	
	});

}
	