const Message = require('../models/Message');
const TokenController = require('./TokenController');
const UserController = require('./UserController');

const verifyReceiver = async (email) => {
    let { success, msg, user } = await UserController.getByEmail(email);

    if (!success || !user) {
        success = false;
        msg = `Unable to verify recipient with email ${email}`;
    } else {
        success = true;
        msg = `Verified recipient with email ${email}`;
    }

    return {
        success,
        msg
    }
}

const verifySender = async (token_hash, user_id) => {
    let { success, msg, token } = await TokenController.getByUserID(user_id);

    if (!success || !token) {
        success = false;
        msg = "Unable to verify sender";
    }

    if (token.token_hash == token_hash) {
        success = true;
        msg = `Verified sender with user ID ${user_id}`;
    } else {
        success = false;
        msg = "Unable to verify sender";
    }

    return {
        success,
        msg
    }
}

module.exports = {
    verifyReceiver,
    verifySender
};
