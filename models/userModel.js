const mysqlService = require('../services/mysql_service');

class userModel {
	constructor() {

	}

	create(userData){
		return new Promise((resolve,reject)=>{
			
		});

	}

	deleteData(userData) {
		let self = this;
		return new Promise((resolve, reject) => {
			self.userExists(userData)
				.then(this.userUpdate.bind(this))
				.then(data => {
					resolve(data);
				}, error => {
					return reject(error);
				})
		});
	}

	updateUser(userData,bodyParams){
		let self = this;
		return new Promise((resolve,reject)=>{
			self.userExists(userData)
			.then(()=>{
				return self.update(userData,bodyParams)
			})		
			.then( data => {
				return resolve(data);
			},error => {
				return reject(error)
			});
		});

	}

	update(userData,bodyParams){

		return new Promise((resolve,reject)=>{
			let updateData = {
				name : bodyParams.name,
				age : bodyParams.age,
				city : bodyParams.city
			}
			

			let whereClause = { id : userData.userId  }
			let updateQuery = "UPDATE user_master set ? where ? ";

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

	userUpdate(userData) {
		return new Promise((resolve, reject) => {
			let deleteRowId = userData.userId;
			let deleteQuery = "UPDATE user_master set status = '0' where id = ? ";

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

	userExists(userData) {

		return new Promise((resolve, reject) => {
			let selectQuery = "select id from user_master where id= ? AND status = ? ";

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
module.exports = userModel;