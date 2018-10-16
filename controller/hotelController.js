
const hotelModelClass = require('../models/hotelModel');

class hotelController {
	
	constructor() {
		this._hotelModelObj = new hotelModelClass();
	}

	create(){
		let self = this;
		return new Promise((resolve,reject)=>{
			self._hotelModelObj.create(requestParams).then(data => {
				
				res.status(200);
            	res.send({'message':data});

			},err => {

				res.status(400);
            	res.send(err);
			
			}).catch( err => {
	        
	            res.status(500);
	            res.send(err);				
			
			});

		});

	}


	update(){


	}

	delete(){


	}

	exists(){


	}
}