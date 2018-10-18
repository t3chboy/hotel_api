
const roomModelClass = require('../models/roomModel');

class roomController{
	
	constructor(){
		this._roomModelObj = new roomModelClass();
	}

	create( bodyParams, hotelId ){

		return new Promise((resolve,reject)=>{
			this._roomModelObj.create( bodyParams, hotelId ).then( data =>{
				resolve(data);
			}, error => {
				reject(error);
			}).catch( error =>{
				reject(error);
			});
		});

	}

	bulkCreate( bodyParams, hotelId ){

		return new Promise((resolve,reject)=>{
			this._roomModelObj.createBulk( hotelId, bodyParams ).then( data => {
				resolve(data);
			},error => {
				reject(error);
			}).catch( error => {
				reject(error);
			})
		});

	}

}

module.exports = roomController;