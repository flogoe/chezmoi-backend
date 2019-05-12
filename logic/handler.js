module.exports.handleResponse = function (p_msg, callback, error) {
    let msg = JSON.parse(p_msg);

    console.log("Received message: ", msg.command, msg.data);

    switch (msg.command) {
        case "create_event":
            break;
        case "create_user":
            break;
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