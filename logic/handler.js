var users = require('./users');
require('./../models/User');

module.exports.handleResponse = function (p_msg, callback, error) {
    let msg = JSON.parse(p_msg);

    console.log("Received message: ", msg.command, msg.data);

    switch (msg.command) {
        case "create_event":
            break;
        case "create_user":
            users.register(msg.data, res => {
                callback({
                    command: 'create_user',
                    data: res
                });
            });
            break;
        case "get_user_with_id":
            users.get_user_with_id(msg.data, res => {
                callback({
                    command: 'get_user_with_id',
                    data: res
                });
            });
        case "get_hosted_events":
            break;
        case "get_visited_event":
            break;
        case "get_pending_events":
            break;
        case "request_food_event":
            break;
        case "confirm_food_event":
            break;

        default:
            console.log('Handler Warning: Command not found!', msg);
            callback({
                command: 'default',
                data: msg
            });

    }
}