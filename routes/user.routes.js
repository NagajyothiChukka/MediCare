require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');
const saltRound = Number(process.env.SALTROUND);
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/auth');
const jwtSecretKey = process.env.SECRETKEY;


const userRoute = express.Router();

userRoute.post('/auth/register', async (req, res) => {
    try {
        //console.log(req.body.password);
        let emailComingFromBody = req.body.email;

        let userInDb = await userModel.findOne({ email: emailComingFromBody });

        // console.log(userInDb);

        if (!userInDb) {
            let passwordComingFromBody = req.body.password;
            bcrypt.hash(passwordComingFromBody, saltRound, async (err, hash) => {
                if (err) {
                    return res.status(500).json({ msg: 'Something went wrong' });
                }
                let userData = await userModel.create({ ...req.body, password: hash });
                return res.status(201).json({ msg: 'User is registered' });

            });
        } else {
            res.status(403).json({ msg: 'User is alreday registered' });
        }
    } catch (err) {
        res.status(500).json({ msg: 'Something went wrong' });
        console.log(err);

    }
});

userRoute.post('/auth/login', async (req, res) => {
    try {
        let rawPassword = req.body.password;
        console.log(req.body.password);
        let email = req.body.email;

        let userInDb = await userModel.findOne({ email });

        if (userInDb) {
            let hashedPassword = userInDb.password;

            bcrypt.compare(rawPassword, hashedPassword, async (err, result) => {
                if (err) {
                    return res.status(500).json({ msg: 'Something went wrong' });
                } else {
                    if (result) {
                        let dataTobeEncrypted = { userId: userInDb._id, role: userInDb.role };

                        let token = jwt.sign(dataTobeEncrypted, jwtSecretKey, { expiresIn: '30min' });

                        return res.status(200).json({ msg: 'Login Successful', token });
                    } else {
                        return res.status(400).json({ msg: 'Wrong password' });
                    }

                }
            })
        }
    } catch (err) {
        res.status(500).json({ msg: 'Something went wrong' });
        console.log(err);
    }
});

userRoute.get('/admin/users', authMiddleware('admin'), async (req, res) => {
    try {
        let users = await userModel.find();
        return res.status(200).json({ msg: 'List of all Users', users });
    } catch (err) {
        res.status(400).json({ msg: 'UnAuthorised' });
        console.log(err);
    }

})
module.exports = userRoute;