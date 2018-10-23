const bookingModel = require('../models/bookingModel');

class bookingController{
	
	constructor(){
		this._bookingModel = new bookingModel();
	}

	create( requestBody, userId ){

		return new Promise((resolve,reject)=>{
			this._bookingModel.create( requestBody, userId )
			.then(data=>{
				return resolve(data)
			}, err => {
				return reject(err);
			}).catch(error =>{
				reject(error);
			})
		});

	}

}

module.exports = bookingController;