
const hotelModelClass = require('../models/hotelModel');

class hotelController {
	
	constructor() {
		this._hotelModelObj = new hotelModelClass();
		console.log( this );
	}

	create( req, res ){
		let self = this;
		let requestParams = req.body
		return new Promise((resolve,reject)=>{
			self._hotelModelObj.create(requestParams).then(data => {
				
				res.status(200);
            	res.send({'message':data});

			},err => {

				res.status(400);
            	res.send({err});
			
			}).catch( err => {
	        
	            res.status(500);
	            res.send({err});				
			
			});

		});

	}


	update(req, res){

		let self = this;
		let requestParams = req.body;
		let requestbody = req.params;
		return new Promise((resolve,reject)=>{
			self._hotelModelObj.update(requestbody, requestParams).then(data => {
				
				res.status(200);
            	res.send({'message':data});

			},err => {

				res.status(400);
            	res.send({err});
			
			}).catch( err => {
	        
	            res.status(500);
	            res.send({err});				
			
			});

		});

	}

	delete( req, res ){

		let self = this;
		let requestParams = req.params
		return new Promise((resolve,reject)=>{
			self._hotelModelObj.delete(requestParams).then(data => {
				
				res.status(200);
            	res.send({'message':data});

			},err => {

				res.status(400);
            	res.send({err});
			
			}).catch( err => {
	        
	            res.status(500);
	            res.send({err});				
			
			});

		});

	}

	exists(){


	}
}

module.exports = hotelController;