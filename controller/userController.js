
const userModelClass = require('../models/userModel');

class UserController {

	constructor() {
		this._userModelObj = new userModelClass();
	}

	create(requestParams){
		let self = this;
		return new Promise((resolve,reject)=>{
			self._userModelObj.create(requestParams).then(data => {
				return resolve(data);	
			},err => {
				reject(err);
			}).catch( err => {
				reject(err);
			});

		});

	}

	userDelete(userData) {
		let self = this;
		return new Promise((resolve, reject) => {
			self._userModelObj.deleteData(userData).then(data => {
				return resolve(data);
			}, err => {
				reject(err);
			}).catch(err => {
				reject(err);
			});
		});
	}

	update(userData,bodyParams){
		let self = this;
		return new Promise((resolve,reject) =>{
			self._userModelObj.updateUser(userData,bodyParams)
			.then(data=>{
				console.log(data);
				return resolve( data );
			}, err => {
				reject(err);
			})
		});
	}
}

module.exports = UserController;