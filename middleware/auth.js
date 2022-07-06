const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

// Find user by token, then add on token
const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Find user by unique ID and a valid / unexpired token
        const user = await UserModel.findOne({
            _id : decoded._id,
            'tokens.token' : token
        });

        if (!user) {
            throw new Error();
        }

        // Successfully found user with valid token
        // Add on this token and user to req body
        req.token = token;
        req.user = user;
        next();
    } catch(error) {
        res.status(500).send({ error : error });
    }
};

module.exports = auth;