const jwt = require("jsonwebtoken");
const moment = require("moment");

const generateToken = async (user_id, role, expires, type, secret = process.env.JWT_SECRET) => {
    const payload = {
        sub: user_id,
        role,
        iat: moment().unix(),
        exp: expires.unix(),
        type,
    };

    return jwt.sign(payload, secret);
};

module.exports = generateToken;