/**
 * [mysqlService Mysql service]
 * @type {[type]}
 */
const mysqlService = require('../services/mysql_service');

class userModel {
	constructor() {
	}

	/**
	 * [create Create new user]
	 * @param  {Json} requestParams [key value pair user data]
	 * @return {[type]}             [Sccuess or fail message]
	 */
	create( requestParams ){

		return new Promise((resolve,reject)=>{
			
			const userData = [ requestParams.name, requestParams.age, requestParams.city ];

			const insertQuery = "INSERT INTO user_master ( name , age , city ) values ( ? , ? , ? ) ";
			
			
			mysqlService.query( insertQuery , userData , ( error , results, fields )=>{
				
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
	 * [deleteData Soft delete user]
	 * @param  {Number} userData [Uniqur Id of user]
	 * @return {[type]}          [Sccuess or Fail message]
	 */
	delete(userId) {
		let self = this;
		return new Promise((resolve, reject) => {
			self.userExists(userId)
				.then(()=>{
					return self.userDelete(userId)
				})	
				.then(data => {
					resolve(data);
				}, error => {
					return reject(error);
				})
		});
	}

	/**
	 * [update Update the user data]
	 * @param  {Number} userId     [Unique Id of user]
	 * @param  {Json} bodyParams [Key value pair of user data]
	 * @return {[type]}            [description]
	 */
	update(userId,bodyParams){
		let self = this;
		return new Promise((resolve,reject)=>{
			self.userExists(userId)
			.then(()=>{
				return self.updateUser(userId,bodyParams)
			})		
			.then( data => {
				return resolve(data);
			},error => {
				return reject(error)
			});
		});

	}

	updateUser(userId,bodyParams){

		return new Promise((resolve,reject)=>{
			let updateData = {
				name : bodyParams.name,
				age : bodyParams.age,
				city : bodyParams.city
			}

			let whereClause = { id : userId  }
			let updateQuery = "UPDATE user_master set ? where ? ";

			mysqlService.query( updateQuery , [ updateData , whereClause ], ( error, results ) =>{

				if (results.affectedRows == 1) {
					return resolve('Updated successfully.');
				}
				if (error) {
					return reject([error.code , error.errno, error.sqlMessage]);
				};
			})

		});

	}

	userDelete(userId) {
		return new Promise((resolve, reject) => {
			let deleteRowId = userId;
			let deleteQuery = "UPDATE user_master set status = '0' where id = ? ";

			mysqlService.query(deleteQuery, deleteRowId, (error, results) => {
				if (results.affectedRows == 1) {
					return resolve('Deleted successfully.');
				}
				if (error) {
					return reject([error.code , error.errno, error.sqlMessage]);
				};
			});

		});

	}

	/**
	 * [userExists Used to check whether user exists]
	 * @param  {Number} userId [Unique Id of user]
	 * @return {[type]}        [description]
	 */
	userExists(userId) {

		return new Promise((resolve, reject) => {
			let selectQuery = "select id from user_master where id= ? AND status = ? ";

			mysqlService.query(selectQuery, [userId, '1'], (error, results, fields) => {
				if (error) {
					return reject([error.code , error.errno, error.sqlMessage]);
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