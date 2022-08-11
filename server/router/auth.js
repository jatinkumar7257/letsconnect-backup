const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

require('../db/conn');
const User = require('../model/userSchema');

router.post('/register', async (req, res) => {

    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
        return res.status(422).json({error: "Filling all fields are mandatory."})
    }    

    try {

        const userExist = await User.findOne({email: email});

        if(userExist) {
            return res.status(422).json({error: "Email already Exist"});
        }

        const user = new User({first_name, last_name, email, password});

        await user.save();

        res.status(201).json({message: "user registered successfully"});
    } catch (err) {
        console.log(err);
    }
});

router.post('/signin', async (req,res) => {

    const { first_name, last_name, email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({error: "Filling all fields are mandatory."});
    }

    const userLogin = await User.findOne({email: email});

    if (userLogin) {
        const isMatch = await bcrypt.compare(password, userLogin.password);
    
        const token = await userLogin.generateAuthToken(); 
        
        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
        });

        if (!isMatch) {
            res.status(400).json({error: "Invalid Credientials."});
        } else {
            res.json({message: "User login successfully."});
        }
    }

});

router.post('/chats', authenticate, (req, res) => {
     console.log('Chats are here');
     res.send(req.rootUser);
});

module.exports = router;