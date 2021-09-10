const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "sahilisa good boy";


// create a user using POST "/api/auth/createUser"  no login required
router.post('/createuser', [
    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res) => {


    // if there are  error , return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: "user with this email already exists"});
    }

    // check whether the user with email exist already
    try{
        let user =await User.findOne({ email: req.body.email});
        if(user){
            return res.status(400).json({error : "sorry user with this email exist already"})
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // create a new user
        user = await User .create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
        
        // .then(user => res.json(user))
        //     .catch(err => {
        //         console.log(err)
        //         res.json({ error: "Please enter a unique value for email " })
        //     });

        const data = {
            user:{
                id:user.id
            }
        } 

        const authtoken = jwt.sign(data,JWT_SECRET);
        // console.log(jwtData);
    
        res.json(authtoken);    
    }catch(err) {
        console.error(err.message);
        res.status(500).send("some error occured");
    }

})

module.exports = router