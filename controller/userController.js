const userModel = require('../models/userModel');

exports.userCreate = function( req, res ){
	userModel.create( req , res );
};


exports.userUpdate = function( req, res ){
	userModel.update( req , res );
};

exports.userDelete = function( req, res ){

	const response = userModel.delete( req , res );
	
	response.then( value =>{
		console.log(value);
	},error => {
		console.log(error);
	}
	);

	/*response.then((value)=>{
    console.log( value );
	if( value.status == false ){
		res.status(400); 
		res.type('json'); 
		res.send({"message":value.message});
	}else{
		res.status(200); 
		res.type('json'); 
		res.send({"message": value.message });
	}
	},*/

	
    //return value;
};