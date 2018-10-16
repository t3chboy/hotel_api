const mysqlService = require('../services/mysql_service');

class hotelModel {
	constructor() {

	}

	create( requestParams ){

		return new Promise((resolve,reject)=>{
			
			const userData = [ requestParams.name, requestParams.city, requestParams.state, requestParams.address, requestParams.total_room_count ];

			const insertQuery = "INSERT INTO hotel_master ( name, city, state, address, total_room_count ) values ( ? , ? , ? ) ";
			
			//mysqlService.connect() ;
			mysqlService.connect().query( insertQuery , userData , ( error , results, fields )=>{
				
				if (error) {
					return reject(error);
				};

				if (results.affectedRows == 1) {
					return resolve('Created successfully.');
				}
				
			})	


		});

	}

	delete(requestParams) {
		let self = this;
		return new Promise((resolve, reject) => {
			self.exists(requestParams)
				.then(this.deleteData.bind(this))
				.then(data => {
					resolve(data);
				}, error => {
					return reject(error);
				})
		});
	}

	update(hotelData,bodyParams){
		let self = this;
		return new Promise((resolve,reject)=>{
			self.exists(hotelData)
			.then(()=>{
				return self.updateHotel(hotelData,bodyParams)
			})		
			.then( data => {
				return resolve(data);
			},error => {
				return reject(error)
			});
		});

	}

	updateHotel(hotelData,bodyParams){

		return new Promise((resolve,reject)=>{
			let updateData = {
				name : bodyParams.name,
				city : bodyParams.city,
				state : bodyParams.state,
				address : bodyParams.address,
				total_room_count : bodyParams.total_room_count
			}
			

			let whereClause = { id : hotelData.hotelId  }
			let updateQuery = "UPDATE hotel_master set ? where ? ";

			mysqlService.connect().query( updateQuery , [ updateData , whereClause ], ( error, results ) =>{

				if (results.affectedRows == 1) {
					return resolve('Updated successfully.');
				}
				if (error) {
					return reject(error);
				};
			})

		});

	}

	deleteData(requestParams) {
		return new Promise((resolve, reject) => {
			let deleteRowId = requestParams.hotelId;
			let deleteQuery = "UPDATE hotel_master set status = '0' where id = ? ";

			mysqlService.connect().query(deleteQuery, deleteRowId, (error, results) => {
				if (results.affectedRows == 1) {
					return resolve('Deleted successfully.');
				}
				if (error) {
					return reject(error);
				};
			});

		});

	}

	exists(userData) {

		return new Promise((resolve, reject) => {
			let selectQuery = "select id from hotel_master where id= ? AND status = ? ";

			mysqlService.connect().query(selectQuery, [userData.userId, '1'], (error, results, fields) => {
				if (error) {
					return reject(error);
				} else if (results.length == 0) {
					return reject("User Not Found");
				} else {
					return resolve(true);
				}

			});

		});

	}
}
module.exports = hotelModel;