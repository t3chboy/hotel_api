## RESTFul APIs for Hotel.
![NodeJS](https://img.shields.io/badge/Powered%20by-NODEJS-brightgreen.svg?longCache=true&style=for-the-badge)
[![ForTheBadge built-with-love](http://ForTheBadge.com/images/badges/built-with-love.svg)]()


Problem 1: Hotel Booking System (RESTful apis, only backend)

Write API:
- create/update/delete hotel.
  - [x] POST to create hotel.
  - [x] PUT to update hotel.
  - [x] DELETE to soft delete hotel.

- create rooms for a hotel.
  - [x] POST to create room.
  - [x] POST to create multiple room.

- create/update/delete users.
  - [x] POST to create users.
  - [x] PUT to update users.
  - [x] DELETE to soft delete users.

- make booking for a user of a room for a specific date range.
  - [x] POSt to make booking for using post-json parameters for user,hotel,room,date range.		

- fetch all available rooms with hotel for a date range. 
  - [x] GET to fetch all available room across all hotel	
  - [x] GET to fetch all available room across specific hotel	

## Technical Details : 

#### Tech Stack
    NodeJs
    Mysql

#### Modules Used
    "body-parser": "^1.18.3",
    "chai-http": "^4.2.0",
    "chai-json-schema": "^1.5.0",
    "dotenv": "^6.1.0",
    "express": "^4.16.4",
    "mysql": "^2.16.0",
    "winston": "^3.1.0"
    "chai": "^4.2.0",
    "mocha": "^5.2.0",
    "nodemon": "^1.18.4",
    "request": "^2.88.0"

#### Setup
    - Get all the node dependencies installed.
#### Database setup
    - Get Mysql installed.
    - Create database - hotel
    - Update .env file with db credential
    - Import hotel_api.sql to database. 
#### APIs Documentation and Usage
- [API DOCUMENTATION](https://documenter.getpostman.com/view/3407371/RWguxHLr)
- Import `Hotel_api.postman_collection.json` collection in postman to run the APIs.

#### Use Application
- [x] Browse to root folder of app via terminal.
- [x] Type `node start` to start the application.
- [x] Hit the APIs from postman collection imported ealier.

#### Test Cases
- Start application using `node start`
- Browse to test folder via terminal
- Type `npm test`

Currently there are 3 test cases
> `GET` To get all the rooms available in all hotel
> `GET` To get all the rooms available with specific hotel
> `POST`To create new hotel 

#### Check ERROR logs
> we are using winston module for error
> logging.
> Errors will be prinited on console and
> stored in a file name all_logs.log in logs folder.
> Errors are stored with timestamp and thier log level.

#### Developer Notes
- For scalability and to handle huge traffic we can use In Memory database like Redis.
- Here we are using Mysql RDBMS, for which we are using connection pooling technic, so that we can cache and resuse connections.  Current pool size = 100.
- Folder Structure
  1. Controller - All Rest based controllers which get the request from routes and pass it to models.
  2. Models - All Models are related to each controller and they perfome database realted operations.
  3. Routes - Contains `indes.js` file which contains handles for all http request based on http methods.
  4. Services - All the services which can be used acrossed application are stored here eg : mysql, logger.
  5. Node_modules : Conatins 3rd party modules installed via npm.
  6. Test : Contains 'test.js' file which as above mentioned 3 test cases.
  7. Logs : Stores the logs files for future investigation.
  8. .env : Contains enviorment specific data and included in git ignore.

#### Requirments
- [x] Commit your code in github project with proper comments and send in your project link.
- [x] README for settingup the project.
- [ ] Design/Write your application assuming scale for lakhs of hotels and users( We have used connection pool, redis can be used but not recommended for test assignment as per telecon.
- [x] RESTful api recommended 
- [x] Implement using node (use any framework).
- [x] Use database of your preference.
- [x] Unit Test (good to have).
- [x] Please if you are assuming anything mention the assumption in comment/readme.
  
  
  
