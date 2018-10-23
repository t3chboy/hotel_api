/**
 * [roomModelClass Model for Room Table]
 * @type {[type]}
 */
const roomModelClass = require('../models/roomModel');

class roomController{
	
	constructor(){
		this._roomModelObj = new roomModelClass();
	}

	/**
	 * [create Create new room for provided hotel]
	 * @param  {Json} bodyParams [Key value pair for Room Data]
	 * @param  {Number} hotelId  [Hotel for which new room will be created]
	 * @return {[type]}          [Success or Fail Message]
	 */
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

	/**
	 * [bulkCreate Create multiple rooms for provided hotel]
	 * @param  {Json} bodyParams [Multiple rooms data]
	 * @param  {Number} hotelId  [Hotel for which new room will be created]
	 * @return {[type]}          [Success or Fail Message]
	 */
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