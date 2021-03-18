const Token = require('../models/Token');

const getByUserID = async (user_id) => {
    let token, msg;
    let success = false;

    try {
        token = await Token.findOne({ user_id: user_id }).exec();

        if (!token) {
            msg = "Token not found";
        } else {
            success = true;
            msg = `Found token for user ID ${user_id}`;
        }
    } catch (err) {
        msg = "Token not found";
    }

    return {
        token,
        msg,
        success,
    };
}

const createToken = async (token_body) => {
    let token, msg;
    let success = false;

    try {
        token = new Token(token_body);

        const doc = await token.save();

        if (!doc) {
            msg = `Failed to create new token for user ID ${token.user_id}`;
        } else {
            success = true;
            msg = `New token for user ID ${token.user_id} created`;
        }
    } catch (err) {
        msg = `Failed to create new token for user ID ${token.user_id}`;
    }

    return {
        token,
        msg,
        success,
    };
}

const updateToken = async (user_id, update_fields) => {
    let token, msg;
    let success = false;

    try {
        token = await Token.findOneAndUpdate({ user_id: user_id }, { $set: update_fields }, { new: true }).exec();

        if (!token) {
            msg = "Failed to update token";
        } else {
            success = true;
            msg = `Token for user ID ${token.user_id} updated`;
        }
    } catch (err) {
        msg = "Failed to update token";
    }

    return {
        token,
        msg,
        success,
    };
}

const deleteToken = async (user_id) => {
    let token, msg;
    let success = false;

    try {
        token = await Token.findOneAndDelete({ user_id: user_id }).exec()

        if (!token) {
            msg = `Failed to delete token for user ID ${user_id}`;
        } else {
            success = true;
            msg = `Token for user ID ${token.user_id} deleted`;
        }
    } catch (err) {
        msg = `Failed to delete token for user ID ${user_id}`;
    }

    return {
        token,
        msg,
        success,
    };
}

module.exports = {
    getByUserID,
    createToken,
    updateToken,
    deleteToken
}
