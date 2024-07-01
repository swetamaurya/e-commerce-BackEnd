const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(400).send("No token.");
    }
    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.foundUser = decoded.user; // Ensure 'user' matches what is set during token creation
        next();
    } catch (error) {
        return res.status(400).send("Token is not valid.");
    }
};

module.exports = auth;
