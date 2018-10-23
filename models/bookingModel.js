const mysqlService = require('../services/mysql_service');

class bookingModel{
	
	constructor(){

	}	

	create( requestBody, userId ){
		return new Promise((resolve,reject)=>{


			const userData = [ requestBody.hotelId, requestBody.room_id, userId, requestBody.no_of_oocupants, requestBody.check_in_date, requestBody.check_out_date ];

			const insertQuery = "INSERT INTO booking_calendar ( hotel_id, room_id, user_id, no_of_oocupants, check_in_date, check_out_date ) values ( ? , ? , ? , ? , ?, ? ) ";
			
			mysqlService.query( insertQuery , userData , ( error , results, fields )=>{
				
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

module.exports = bookingModel;