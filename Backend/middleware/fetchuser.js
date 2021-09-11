const jwt = require('jsonwebtoken');
const JWT_SECRET = "sahilisa good boy";

const fetchuser = (req, res, next) =>{
    // get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(400).send({error : "plz authenticate using a valid token"})
    }
    try{
        const data  = jwt.verify(token , JWT_SECRET);
        req.user = data.user;
        next()
    }catch(err){
        res.status(400).send({error : "plz authenticate using a valid token"})
    }
}
module.exports = fetchuser;