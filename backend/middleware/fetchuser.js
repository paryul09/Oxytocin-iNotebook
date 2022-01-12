var jwt = require('jsonwebtoken');
const JWT_SECRET = "breakinggameprision"

const fetchuser = (req,res,next)=>{
    //get the user from the JWT token and add id to the object
    // const token =req.header['auth-token'];
    // console.log(req);
    const token = req.headers.authorization;
    
    // console.log(req);
    console.log(req.headers);

    console.log(token);
    if(!token){
        res.status(401).send({eroor:"please authenticate using a valid token"})
    }
    try {
    const data = jwt.verify(token,JWT_SECRET);
    req.user = data.user;
    next();
    } catch (error) {
        res.status(401).send({eroor:"please authenticate using a valid token"})
    }
    
}

module.exports = fetchuser;