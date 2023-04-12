const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    console.log("authJwt: ", token);
    if (token) {
        jwt.verify(token, process.env.API_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Token is not valid' });
            } else {
                req.decoded = decoded;
                console.log("authJWT: Token verified");
                next();
            }
        });
    } else {
        console.log("No token provided");
        res.status(401).redirect('/login')
    }
};
module.exports = verifyToken;
