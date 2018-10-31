module.exports = function(models, logger,jwt,bcrypt) {

	return {

			/*
			This function takes in the username and password of the user trying to loginVerify
			it will hash the given password and compare with the saved password in the Database using bcrypt
			*/
			loginVerify: async function(data,callback){
	    	return new Promise(function (resolve, reject) {
		      console.log(data.username);
		      models.user.findOne({ _username: data.username }).exec(function (err, user) {
		       if (err) {
		         console.log(err);
		       } else if (!user) {
		       	resolve({ statusCode: "Error", msg: 'User not found.'})
		       // return callback.send({ statusCode: "Error", msg: 'User not found.'});
		       }

		       bcrypt.compare(data.password, user._password, function (err, result) {
		         if (result === true) {
		           const JWTToken = jwt.sign({
		             email: data.email,
		             _id: user._id
		           },
		           'secret',
		           {
		           expiresIn: '2h'
		           });
		           console.log("User Found")
		           resolve({ token: JWTToken, user: user, statusCode: "initiateSocket" })
		           //return callback.send({ token: JWTToken, user: user, statusCode: "initiateSocket" })
		         } else {
		         	resolve({ statusCode: "Error", msg: "Email or Password is incorrect" });
		        //return callback.send({ statusCode: "Error", msg: "Email or Password is incorrect" });
		         }
		       })
		     });
    	});
   },
		/*
		 * Find Users and Update
		 */
		updateUser: function(id, data) {
			models.user.findByIdAndUpdate(id, data, function(error, number, raw) {
				if (error) {
					logger.info('Users', error);
				}
			});
		},


		/*
		 * This function will get all users, currently not in use.
		 */
		getUsers: async function(callback) {
			return new Promise(function(resolve,reject){
				models.user.find({}, function(error, users) {
					if (error) {
						logger.info('items', error);
					}
					callback(users);
				});
			});
		},
	
		/*
		 * Create New Users
		 */
		createUser: async function(data) {
			var uploadDIR = '/server/userContent/uploads'
			console.log(data)
			return new Promise(function (resolve, reject) {
				var newUser = new models.user(data);
		    	models.user.findOne({ _username: data._username }).exec(function (err, user) {
		        if (err) {
		          	console.log(err)
		        }else if(user == null){
		          newUser.save(function (error) {
		            if (error) {
		            	console.log(error)
		            }else{
		          	resolve({statusCode: "User", msg: "User Created" });
							}
		          });
		        }else if(user != null){
		          resolve({statusCode: "UserError", msg: "User Already Exists" })
		        }
		    });
    	});


		},

		/*
		 * Delete User by Id
		 */
		deleteUser: async function(id) {
			return new Promise(function(resolve,reject){
				models.users.findByIdAndRemove(id, function(error) {
					if (error) {
						logger.info('items:', error);
					}
					else{
						resolve({statusCode: "Success", msg: "User Deleted" })
					}
				});
			});
		},



		/*
		 * Drop tables
		 *
		 */
		drop: function(callback) {
			models.users.remove({}, function(error) {
				if (callback) {
					callback();
				}
			});
		}
	};
};