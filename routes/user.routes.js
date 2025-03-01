const express = require('express');
const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');
const saltRound = Number(process.env.SALTROUND);

const userRoute = express.Router();

userRoute.post('/signup', async (req, res) => {
    try {
        let emailComingFromBody = req.body.email;

        let userInDb = await userModel.findOne({ email: emailComingFromBody });

        // console.log(userInDb);

        if (!userInDb) {
            let passwordComingFromBody = req.body.password;
            bcrypt.hash(passwordComingFromBody, saltRound, async (err, hash) => {
                if (err) {
                    return res.status(500).json({ msg: 'Something went wrong' })
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

// userRoute.post('/login', async(req,res)=>{
//      let rawPassword = req.body.password;

//      let userInDb = 
// });
module.exports = userRoute;