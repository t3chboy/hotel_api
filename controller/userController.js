/**
 * [userModelClass Model representing DB user table]
 * @type {[type]}
 */
const userModelClass = require('../models/userModel');

class UserController {

	constructor() {
		this._userModelObj = new userModelClass();
		console.log( this );
	}

	/**
	 * [create Create new user]
	 * @param  {Json} requestParams [key value pairs with user data]
	 * @return {[type]}             [success or error message]
	 */
	create(requestParams){
		let self = this;
		return new Promise((resolve,reject)=>{
			self._userModelObj.create(requestParams).then(data => {
				return resolve(data);	
			},err => {
				return reject(err);
			}).catch( err => {
				return reject(err);
			});

		});

	}

	/**
	 * [userDelete Soft delete user]
	 * @param  {Number} userId [key value pairs with user update data]
	 * @return {[type]}        [success or error message]
	 */
	delete(userId) {
		let self = this;
		return new Promise((resolve, reject) => {
			self._userModelObj.delete(userId).then(data => {
				return resolve(data);
			}, err => {
				return reject(err);
			}).catch(err => {
				return reject(err);
			});
		});
	}

	/**
	 * [update Update old user]
	 * @param  {Number} userId 		[Unique user id]
	 * @param  {json} bodyParams [key value pairs with user update data]
	 * @return {[type]}            [success or error message]
	 */
	update(userId,bodyParams){
		let self = this;
		return new Promise((resolve,reject) =>{
			self._userModelObj.update(userId,bodyParams)
			.then(data=>{
				return resolve( data );
			}, err => {
				return reject(err);
			})
			.catch( err => {
				return reject(err);
			})
		});
	}
}

module.exports = UserController;