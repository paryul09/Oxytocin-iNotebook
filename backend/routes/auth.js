const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "breakinggameprision"

//ROUTE1: create a user using post and doest not require "/api/auth/createuser"
router.post('/createuser',[
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('password','password must be atleast 5 characters').isLength({ min: 5 }),
    body('email','Enter a valid Email').isEmail(),   
], async (req,res)=>{
  let success = false;
//checking for errors if there are errors return bad requests and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
      
      try {
        
     //checking for duplicates
        let  user = await User.findOne({email:req.body.email});
        if(user){
          return res.status(400).json({success, error:"sorry a user with this email already exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        //create a new user
        user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,

      });
      const data = {
        user:{
          id:user.id
        }
      }
      const authToken = jwt.sign(data,JWT_SECRET);
      
      // .then(user => res.json(user)).catch(err=>{console.log(err)    
      //   res.json({error:'please enter unique value for email'})})

      // res.json(user)
      success = true;
      res.json({success, authToken})


      //catch errors
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server Error");
    }

      
})

//ROUTE2: authenticate a user using:POST "/api/auth/login" and doest not require login  
router.post('/login',[
  body('email','Enter a valid Email').isEmail(),   
  body('password','password cannot be blank').exists(),
], async (req,res)=>{
  let  success = false
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }

  const{email, password} = req.body;
  try {
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({success,error:"please try to login with correct credentials"});
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){ 
      return res.status(400).json({success, error:"please try to login with correct credentials"});
    }

    const data = {
      user:{
        id:user.id
      }
    }

    const authToken = jwt.sign(data,JWT_SECRET);
    success = true
    res.json({success,authToken})
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error");
  }
    
})

//ROUTE3: Get a loged user using:POST "/api/auth/getUser" and require login  
router.post('/getUser',fetchuser, async (req,res)=>{
try {
  userId = req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user)
} catch (error) {
  console.error(error.message);
    res.status(500).send("Internal server Error");
}
})

module.exports  = router