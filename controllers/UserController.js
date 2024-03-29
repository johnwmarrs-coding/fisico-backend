const User = require('../models/User');
const TokenController = require('../controllers/TokenController');
const sha256 = require('js-sha256');

const getByID = async (id) => {
    let user, msg;
    let success = false;

    try {
        user = await User.findById(id, 'username email').exec();

        if (!user) {
            msg = `User not found with ID ${id}`;
        } else {
            success = true;
            msg = `Found user ${user.username}`;
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

const getByEmail = async (email) => {
    let user, msg;
    let success = false;

    try {
        user = await User.findOne({ email: email }).exec();

        if (!user) {
            msg = `User not found with email ${email}`;
        } else {
            success = true;
            msg = `Found user ${user.username}`;
        }
    } catch (err) {
        msg = `User not found with email ${email}`;
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
                "user_id": doc._id,
                "token_hash": token_hash
            }

            const { token } = await TokenController.createToken(token_body);
            token_hash = token.token_hash;
        }
    } catch (err) {
        success = false;
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
        user = await User.findByIdAndUpdate(id, { $set: update_fields }, { new: true, select: 'username email' }).exec();

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
        user = await User.findByIdAndDelete(id, { select: 'username email '}).exec();

        if (!user) {
            msg = "Failed to delete user";
        } else {
            success = true;
            msg = `User ${user.username} deleted`;

            await TokenController.deleteToken(id);
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

const login = async (email, password_hash) => {
    let user, msg, token_hash;
    let success = false;

    try {
        user = await User.findOne({ email: email }).exec();

        if (!user) {
            msg = "Login failed"
        } else {
            password_hash = sha256(password_hash);

            if (password_hash === user.password_hash) {
                success = true;
                msg = "Login successful";

                token_hash = sha256(user.password_hash + Date.now());
                let token_body = {
                    "user_id": user._id,
                    "token_hash": token_hash
                }

                const { token } = await TokenController.createToken(token_body);
                token_hash = token.token_hash;
            } else {
                msg = "Incorrect password";
            }
        }
    } catch (err) {
        success = false;
        msg = "Login failed"
    }

    return {
        user,
        token_hash,
        msg,
        success
    }
}

const logoff = async (user_id) => {
    let token, msg;
    let success = false;

    try {
        data = await TokenController.getByUserID(user_id );
        token = data.token

        if (!token) {
            msg = "Logoff failed";
        } else {
            await TokenController.deleteToken(user_id);
            success = true;
            msg = `Logoff succeeded for user with ID ${user_id}`;
        }
    } catch (err) {
        success = false;
        msg = "Logoff failed";
    }

    return {
        token,
        msg,
        success
    }
}

module.exports = {
    getByID,
    getByEmail,
    createUser,
    updateUser,
    deleteUser,
    login,
    logoff
};
