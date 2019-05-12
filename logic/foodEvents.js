var mongoose = require('mongoose');
var Crypto = require('crypto-js')
require('./../models/foodEvent');
var User = mongoose.model('FoodEvent');

mongoose.connect('mongodb://mongo:27017');


module.exports.register = function (data, callback, error) {
    const foodEvent = data.data;
    console.log("REGISTER", foodEvent);

    if (foodEvent.title && foodEvent.host && foodEvent.capacity && foodEvent.location && foodEvent.description && foodEvent.pricing && foodEvent.foodTags) {
        var data = {
            id: mongoose.Types.ObjectId(),
            title: foodEvent.title,
            host: foodEvent.host,
            description: foodEvent.description,
            rating: 1,
            location: {
                city: "",
                street: "",
                zipcode: ""
            },
		pricing: foodEvent.pricing,
		status: "Available",
		foodTags: foodEvent.foodTags,
            register_date: new Date(),
            history: []


        }
        var newFoodEvent = new FoodEvent(data);
        newFoodEvent.save((err, registeredFoodEvent) => {
            if (err) {
                error(err);
                console.error('Error while creating new foodEvent.', err);
            } else {
                console.log('Registered new foodEvent.', registeredFoodEvent);
                FoodEvent.find({}, function (err, user) {
                    if (err) {
                    } else {
                        callback(foodEvent);
                    }
                })
            }
        });

    } else {

    }



}

module.exports.get_foodEvent_with_host_id = function (data, callback, error) {
    const id = data.id;

    if (id) {
        FoodEvent.find({
            'host.id': id
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


