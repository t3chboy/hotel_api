
const mysqlService = require('../services/mysql_service');
const hotelModelClass = require('./hotelModel');

class roomModel{
	
	constructor(){
		this._hotelModelObj = new hotelModelClass();
	}

	/**
	 * [create Create new room for Data]
	 * @param  {Json} bodyParams [Key value pair for room Data]
	 * @param  {Number} hotelId  [hotel for which room will be created]
	 * @return {[type]}          [Success or Fail Message]
	 */
	create( bodyParams, hotelId ){

		return new Promise((resolve,reject)=>{
			this._hotelModelObj.exists( hotelId )
			.then(()=>{
				return this.createRoom( hotelId, bodyParams )
			})
			.then(data =>{
				return resolve(data); 
			})
			.catch(error => {
				return reject(error);
			});
		});
		
	}

	createRoom( hotelId, bodyParams ){

		return new Promise((resolve,reject)=>{

			const roomData = [ hotelId, bodyParams.room_description, bodyParams.cost_per_day, bodyParams.room_no ];

			const insertQuery = "INSERT INTO room_master ( hotel_id, room_description, cost_per_day, room_no ) values ( ? , ? , ? , ? ) ";
			
			mysqlService.query( insertQuery , roomData , ( error , results, fields )=>{
				
				if (error) {
					return reject([error.code , error.errno, error.sqlMessage]);
				};

				if (results.affectedRows == 1) {
					return resolve('Created successfully.');
				}
				
			})

		});
	}

	/**
	 * [createBulk Create multiple rooms]
	 * @param  {Number} hotelId   [hotel for which multiple rooms will be created]
	 * @param  {Json} bodyParams  [Key value pair for multiple room data]
	 * @return {[type]}           [description]
	 */
	createBulk( hotelId, bodyParams ){
		return new Promise((resolve,reject)=>{
			this._hotelModelObj.exists(hotelId)
			.then(()=>{
				return this.createBulkrooms( hotelId, bodyParams )
			})
			.then((data)=>{
				return resolve(data);
			})
			.catch((error)=>{
				return reject(error);
			})
		});
	}

	createBulkrooms( hotelId, bodyParams ){
		
		return new Promise((resolve,reject)=>{
			let roomData = [];
			if( bodyParams.length >= 1 ){
				
				for( let eachParam of bodyParams ){
					roomData.push([ hotelId, eachParam.room_description, eachParam.cost_per_day, eachParam.room_no ]);	

				}
			}
		
			const insertQuery = "INSERT INTO room_master ( hotel_id, room_description, cost_per_day, room_no ) values ( ? ) ";
			
			mysqlService.query( insertQuery , roomData , ( error , results, fields )=>{
				
				if (error) {
					return reject([error.code , error.errno, error.sqlMessage]);
				};

				if (results.affectedRows == 1) {
					return resolve('Created successfully.');
				}
				
			})


		});

	}
}
module.exports = roomModel;
