/**
 * [hotelModelClass Class for DB hotel table]
 * @type {[type]}
 */
const hotelModelClass = require('../models/hotelModel');

class hotelController {
	
	constructor() {
		this._hotelModelObj = new hotelModelClass();
		console.log( this );
	}
	

	/**
	 * [create Create new Hotel]
	 * @param  {Json} requestParams [key value pairs with hotel data]
	 * @return {[type]}             [success or error message]
	 */
	create( requestParams ){
		return new Promise((resolve,reject)=>{
			this._hotelModelObj.create( requestParams )
			.then( data =>{
				return resolve(data);
			},err => {
				return reject(err);
			})
			.catch( err => {
				return reject(err);
			})


		})

	}

	update( hotelId, requestParams ){
		return new Promise((resolve,reject)=>{
			this._hotelModelObj.update(hotelId,requestParams)
			.then(data => {
				return resolve( data )
			},err => {
				return reject( err );
			})
			.catch( err => {
				return reject(err);
			})
		})
	}

	/**
	 * [delete Soft delete Hotel data]
	 * @param  {Number} hotelId [unique hotel data]
	 * @return {[type]}         [success or error message]
	 */
	delete( hotelId ){
		return new Promise((resolve,reject)=>{
			this._hotelModelObj.delete( hotelId )
			.then( data =>{
				return resolve( data );
			},err => {
				return reject(err);
			})
			.catch( err => {
				return reject(err);
			})
		})
	}

}

module.exports = hotelController;