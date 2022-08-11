const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');

const Authenticate = async (req, res, next) => {
    try {

        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verifyToken(token, process.env.SECRET_KEY);

        const rootsUser = await User.findOne({_id: verifyToken.id, "tokens.token":token });

        if (!rootsUser) {
            throw new Error('User not Found');
        }

        req.token = token;
        req.rootUser = rootsUser;
        rq.userID = rootsUser._id;

        next();

    } catch (err) {
        res.status(400).send('Unauthorized:No token provided');
        console.log(err);
    }
}

module.exports = Authenticate;