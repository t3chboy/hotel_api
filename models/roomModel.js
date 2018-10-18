
const mysqlService = require('../services/mysql_service');
const hotelModelClass = require('./hotelModel');

class roomModel{
	
	constructor(){
		this._hotelModelObj = new hotelModelClass();
	}

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
			
			mysqlService.connect().query( insertQuery , roomData , ( error , results, fields )=>{
				
				if (error) {
					return reject(error);
				};

				if (results.affectedRows == 1) {
					return resolve('Created successfully.');
				}
				
			})

		});
	}

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
			console.log( roomData );
			const insertQuery = "INSERT INTO room_master ( hotel_id, room_description, cost_per_day, room_no ) values ( ? ) ";
			
			mysqlService.connect().query( insertQuery , roomData , ( error , results, fields )=>{
				
				if (error) {
					return reject(error);
				};

				if (results.affectedRows == 1) {
					return resolve('Created successfully.');
				}
				
			})


		});

	}
}
module.exports = roomModel;
