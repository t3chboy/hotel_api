const mysqlService = require('../services/mysql_service');
const hotelModelClass = require('./hotelModel');

class searchModel{

	constructor(){
		this._hotelModelObj = new hotelModelClass();
	}

	/**
	 * [searchRoom Search for the avaible rooms based on query string]
	 * @param  {Object} bodyParams [Query String params of url]
	 * @param  {Number} hotelId    [Specific hotel id where to serach for]
	 * @return {[type]}            [description]
	 */
	searchRoom( bodyParams, hotelId ){
		
		return new Promise((resolve,reject)=>{

			if( hotelId == 0 ){
			
					this.searchBookedrooms( bodyParams , hotelId )
				.then( (data) =>{
					return this.searchVaccantRooms(data.bookedRooms,data.connection , hotelId)
				})
				.then(data=>{
					return resolve(data);
				})
				.catch(error => {
					return reject(error);
				});
			
			}else{
			
				this._hotelModelObj.exists( hotelId )
				.then(() =>{
					return this.searchBookedrooms( bodyParams, hotelId )	
				})
				.then( (data) => {
					return this.searchVaccantRooms(data.bookedRooms,data.connection,hotelId)	
				})
				.then(data=>{
					return resolve(data);
				})
				.catch(error =>{
					return reject(error);
				});
			
			}
		});	
	}

	searchVaccantRooms( bookedRooms,connection, hotelId ){
		return new Promise((resolve,reject)=>{
			let sqlFindVaccantRooms;
			let queryParams = [];
			let sqlAppendHotelQuery = "";
			let sqlAppendBookedRoomQuery = "";


			if( hotelId > 0 ){
				sqlAppendHotelQuery = ' and hm.id = ? ';
				queryParams.push( hotelId );
			}

			if( bookedRooms.length > 0 ){
				sqlAppendBookedRoomQuery = ' and rm.id not in ( ? ) ';
				queryParams.push( bookedRooms );
			}

			sqlFindVaccantRooms = 'select hm.name, hm.city,hm.address,hm.id,rm.id,rm.room_description,rm.cost_per_day from hotel_master as hm inner join room_master as rm on rm.hotel_id = hm.id where rm.status = "1" and hm.status = "1" ' + sqlAppendHotelQuery + sqlAppendBookedRoomQuery ;

			//mysqlService.getConnection((err, connection)=>{

				connection.query( sqlFindVaccantRooms,  queryParams  , ( error, results )=> {
					
					if( error ){
						return reject(error);
					}

					if( results.length > 0 ){
						connection.release();
						return resolve(results);
					}else{
						return resolve([]);
					}


				});

			//});	
				
			}) ;
	}

	searchBookedrooms( bodyParams, hotelId ){

		return new Promise((resolve,reject)=>{

			let bookedRooms = [];

			let sqlBookedRooms = "";
			let sqlParams = "";
			if( hotelId > 0 ){
				sqlBookedRooms = " select hotel_id, room_id from booking_calendar where date( ? ) between date( check_in_date ) and date( check_out_date ) and hotel_id = ? and status = ? ";
				sqlParams = [ bodyParams.check_in_date, hotelId , '1' ];
				
			}else{
				sqlBookedRooms = " select hotel_id, room_id from booking_calendar where date( ? ) between date( check_in_date ) and date( check_out_date )  and status = ? ";
				sqlParams = [ bodyParams.check_in_date, '1' ];
			}

			mysqlService.getConnection((err, connection)=>{

			connection.query( sqlBookedRooms, sqlParams , ( error, results )=> {

				if( error ){
					return reject(error);
				}

				if( results.length > 0 ){
					Object.keys(results).forEach(function(key) {
						var row = results[key];
						bookedRooms.push( row.room_id );
					});
					
					return resolve({bookedRooms,connection});
				}else{
					return resolve({bookedRooms,connection});
				}	
			});
		});

	});
	}
}

module.exports = searchModel;