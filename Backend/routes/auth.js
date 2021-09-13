const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "sahilisa good boy";
const fetchuser = require('../middleware/fetchuser');


// Route 1 : create a user using POST "/api/auth/createUser"  no login required
router.post('/createuser', [
    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res) => {


    // if there are  error , return bad request and the error
    const errors = validationResult(req);
    let success = false; 
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: "user with this email already exists" });
    }

    // check whether the user with email exist already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success:success, error: "sorry user with this email exist already" })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        const data = {
            user: {
                id: user.id
            }
        }
        success = true;

        const authtoken = jwt.sign(data, JWT_SECRET);
        // console.log(jwtData);

        res.json({ "success" : success ,"authtoken": authtoken });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server error");
    }

})

// Route 2: authenticate a user using POST "/api/auth/login"  no login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: "user with this email already exists" });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: success ,errors: "Please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success: success ,errors: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        success = true;
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ "success": success ,"authtoken": authtoken });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server error");
    }
}

)

// route 3 :  get loggedin  User  details using Post :" api/auth/getuser".login required
router.post('/getuser',fetchuser, async (req, res) => {
    try {
        const userid = req.user.id;
        const user = await User.findById(userid).select("-password");
        res.send(user);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server error");
    }
}
)
module.exports = router