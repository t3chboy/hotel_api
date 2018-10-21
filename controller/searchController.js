
const searchModel = require('../models/searchModel');

class searchController{
	
	constructor(){
		this._searchModel = new searchModel();
	}

	/**
	 * [search Search for rooms]
	 * @param  {Json} queryParams  [Query String having search params]
	 * @param  {Number} hotelId    [Search filter for specific to hotel Id]
	 * @return {[type]}            [description]
	 */
	search( queryParams, hotelId ){

		return new Promise((resolve,reject)=>{
			this._searchModel.searchRoom( queryParams, hotelId )
			.then(data =>{
				return resolve(data);
			},err => {
				return reject(err);
			})
			.catch( error =>{
				return reject( error );
			});
		});

	}

}

module.exports = searchController;