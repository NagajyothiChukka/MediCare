require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.SECRETKEY;

const authMiddleware = function (...allowedRole) {
    return (req, res, next) => {
        let token = req.headers?.authorization?.split(' ')[1];
        //  console.log('token', token);

        if (!token) {
            res.status(404).json({ msg: 'Token not found' });
        } else {
            let decoded = jwt.verify(token, jwtSecretKey);

            //  console.log('decode', decoded);

            if (allowedRole.includes(decoded.role)) {
                req.body.userId = decoded.userId;
                next();
            } else {
                res.status(400).json({ msg: 'UnAuthorised User' });
            }
        }
    }
}

module.exports = authMiddleware;
