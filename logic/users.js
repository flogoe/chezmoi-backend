var mongoose = require('mongoose');
var Crypto = require('crypto-js')
require('./../models/User');
var User = mongoose.model('User');

mongoose.connect('mongodb://mongo:27017');


module.exports.register = function (data, callback, error) {
    const user = data.data;
    console.log("REGISTER", user);

    if (user.email && user.password) {
        var data = {
            id: mongoose.Types.ObjectId(),
            email: user.email,
            name: user.name,
            salt: user.salt,
            hash: Crypto.SHA256(user.password + user.salt).toString(),
            description: "",
            rating: 1,
            location: {
                city: "",
                street: "",
                zipcode: ""
            },
            register_date: new Date(),
            history: []


        }
        var newUser = new User(data);
        newUser.save((err, registeredUser) => {
            if (err) {
                error(err);
                console.error('Error while creating new user.', err);
            } else {
                console.log('Registered new user.', registeredUser);
                User.find({}, function (err, user) {
                    if (err) {
                    } else {
                        callback(user);
                    }
                })
            }
        });

    } else {

    }



}

module.exports.get_user_with_id = function (data, callback, error) {
    const id = data.id;

    if (id) {
        User.find({
            'id': id
        }, function (err, user) {
            if (err) {
                error(err);
            } else {
                callback(user);
            }
        });
    } else {
    }
}

module.export.checkLogin = function(data, callback, error) {
	const user = data.data;
	
	if(user.email && user.password) {
		User.find({
		'email': user.email
		}, function (err, foundUser) {
			if(err){
				error(err);
			}else{
			
            		if(Crypto.SHA256(user.password + foundUser.salt).toString() === foundUser.hash)
					callback(foundUser);
			else
					callback(false);
			}
		})
	}
}


