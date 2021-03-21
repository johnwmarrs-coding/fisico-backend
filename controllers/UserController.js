const User = require('../models/User');
const Token = require('../models/Token');
const TokenController = require('../controllers/TokenController');
const sha256 = require('js-sha256');
const { token } = require('morgan');

const getByID = async (id) => {
    let user, msg;
    let success = false;

    try {
        user = await User.findById(id).exec();

        if (!user) {
            msg = `User not found with ID ${id}`;
        } else {
            success = true;
            msg = "Found user";
        }
    } catch (err) {
        msg = `User not found with ID ${id}`;
    }

    return {
        user,
        msg,
        success,
    };
}

const createUser = async (user_body) => {
    let user, msg, token_hash;
    let success = false;

    try {
        user_body.password_hash = sha256(user_body.password_hash);

        user = new User(user_body);

        const doc = await user.save();

        if (!doc) {
            msg = "Failed to create new user";
        } else {
            success = true;
            msg = `New user ${doc.username} created`;

            token_hash = sha256(doc.password_hash + doc.createdAt);
            let token_body = {
                "user_id": doc.user_id,
                "token_hash": token_hash
            }

            TokenController.createToken(token_body);
        }
    } catch (err) {
        msg = "Failed to create new user";
    }

    return {
        user,
        token_hash,
        msg,
        success
    };
}

const updateUser = async (id, update_fields) => {
    let user, msg;
    let success = false;

    try {
        user = await User.findByIdAndUpdate(id, { $set: update_fields }, { new: true }).exec();

        if (!user) {
            msg = "Failed to update user";
        } else {
            success = true;
            msg = `User ${user.username} updated`;
        }
    } catch (err) {
        msg = "Failed to update user";
    }

    return {
        user,
        msg,
        success
    };
}

const deleteUser = async (id) => {
    let user, msg;
    let success = false;

    try {
        user = await User.findByIdAndDelete(id).exec();

        if (!user) {
            msg = "Failed to delete user";
        } else {
            success = true;
            msg = `User ${user.username} deleted`;
        }
    } catch (err) {
        msg = "Failed to delete user";
    }

    return {
        user,
        msg,
        success
    };
}

module.exports = {
    getByID,
    createUser,
    updateUser,
    deleteUser
};
