let expect = require('chai').expect;
let request = require('request');
let chai = require('chai');
let should = chai.should();
chai.use(require('chai-json-schema'));


describe('/GET Hotel', () => {
	it('it should get all the rooms available with rooms', (done) =>{

		var options = {
			url: 'http://localhost:4000/search/?check_in_date=2018-11-20',
			headers: {
				'content-type': 'application/json'
			},
			json:true
		};

		request(options, function(error, response, body) {
			expect(response.statusCode).to.equal(200);
			expect(response.body).to.be.an('object');
			expect(response.body).to.have.property('data');
			done();
		})
	});
})


describe('/GET Hotel For specific Hotel', () => {
	it('it should get all the rooms available with rooms', (done) =>{

		let options = {
			url: 'http://localhost:4000/search/2/?check_in_date=2018-11-20',
			headers: {
				'content-type': 'application/json'
			},
			json:true
		};

		request(options, function(error, response, body) {
			expect(response.statusCode).to.equal(200);
			expect(response.body).to.be.an('object');
			expect(response.body).to.have.property('data');
			done();
		})
	});
})


describe('/POST Add new Hotel', () => {
	it('it should get all the rooms available with rooms', (done) =>{
		let jsonDataObj = {"name":"Taj Vivanta","city":"Mumbai","state":"MH","address":"Opp gateway of India",
	"total_room_count":60 }
		let options = {
			method: 'POST',
			url: 'http://localhost:4000/hotel',
			headers: {
				'content-type': 'application/json'
			},
			body: jsonDataObj,
			json:true
		};

		request(options, function(error, response, body) {
			expect(response.statusCode).to.equal(200);
			expect(response.body).to.be.an('object');
			expect(response.body).to.have.property('message');
			expect(response.body).to.include({ 'message': 'Created successfully.' });
			done();
		})
	});
})