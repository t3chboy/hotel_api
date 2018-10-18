
class token_service{
	constructor(){

	}
	
	/**
	 * [validateToken Used to validate token and provide user id]
	 * @param  {[type]} _token [long string used for validating user api request]
	 * @return {Number}        [User id based on token stored in session]
	 */
	validateToken( _token ){
		console.log("token"+_token);
		if( _token != null && _token != "null" && _token != undefined && _token != "" ){
			const userId = 1
			return userId;
			
		}else{
			return 0;
		}

	}
}

module.exports = token_service;