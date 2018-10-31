var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var chalk = require('chalk');
var mongoose = require('mongoose');
var logger = require('winston');
var bcrypt = require('bcrypt');
var app = express()
var http = require('http').Server(app)
var bodyPaser = bodyParser.json()
var port = process.env.PORT || 8080;
var config = require('./server/config.json');
var path = require("path");



if (config.connections.database) {
    // Database connection: (Change this to what your database URL is!)
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/theDatabase',{ useNewUrlParser: true });
    var db = mongoose.connection;
	require(__dirname + '/server/Utils/database.js')(chalk, db);



	// Models - database Schemas
	var models = {
		mongoose: mongoose,
		user: require(__dirname + '/server/models/users')(mongoose,bcrypt),
	};
	//Controllers - database functions
	var controller = {
		user: require(__dirname + '/server/controllers/users')(models, logger,bcrypt),
	};

}

app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyPaser);

var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Listening on %s", port)
})

require(__dirname + '/server/utils/routes')(models, controller, app, express)



module.exports = server; // export for testing purposes
