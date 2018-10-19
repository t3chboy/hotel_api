
const searchModel = require('../models/searchModel');

class searchController{
	
	constructor(){
		this._searchModel = new searchModel();
		
	}

	searchRoom( bodyParams ){

		return new Promise((resolve,reject)=>{
			this.findRooms( bodyParams )
			.then(data =>{
				return resolve(data);
			},err => {
				return reject(err);
			})r
			.catch( error =>{
				return reject( error );
			});
		});

	}

}

module.exports = searchController;