const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body ,  validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const JWT_SECRET = 'salonisinghhghbnyj$$@154';
var fetchUser = require('../middleware/fetchUser');
var jwt = require('jsonwebtoken');

// Route 1 : Create a user using POST "/api/auth/createuser"---doesn't require auth--
router.post('/createuser', [
  body('name','Enter a valid name ').isLength({ min: 3 }),
  body('email','Enter a valid Email ').isEmail(),
  body('password','password must be atleast 5 characters').isLength({ min: 5 }),
],async(req, res) => {
      
  try {

    //if there are errors, return Bas request and the errors---
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //check whether user with this email exists already
    let existingUser = await User.findOne({email:req.body.email});  
    if(existingUser){
        return res.status(400).json({error:"sorry a user with this email already exists"})
    }
    

    // changing password to hash using npm install bcyptjs-**
    const salt = await bcrypt.genSalt(10);
    const secPaas = await bcrypt.hash(req.body.password,salt);
   

    //create a new user---
    const user = await User.create({  
        name: req.body.name,
        email:req.body.email,
        password: secPaas
    })
    

    //creating authentication token for user----
    const data = {
      user:{
        id:user.id
      }
    }
   const authToken = jwt.sign(data , JWT_SECRET);
   console.log(authToken);
   res.json({authToken});

    
} catch(error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}}
);



//Route 2  :  Authenticate a user : Post "/api/auth/login". No login required----

router.post('/login', [ //endpoint /login
  body('email','Enter a valid Email ').isEmail(),
  body('password','Password can not be blank ').exists()
],async(req, res) => { 
  let Success = false;

   //if there are errors, return Bas request and the errors---
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
   }

  const {email,password} = req.body;
   try {
    let user = await User.findOne({email});
    Sucess = false;
      if(!user){
        return res.status(400).json({error:"Plese Login with correct credentials..."})
      }

      const passwordCompare = await  bcrypt.compare(password, user.password);
      if(!passwordCompare){
       Sucess = false;
        return res.status(400).json({Sucess,error:"Plese Login with correct credentials..."})
      }
      const data = {
        user:{
          id:user.id
        }
      }
     const authToken = jwt.sign(data , JWT_SECRET);
     Success = true;
     res.json({Success,authToken});

   } catch (error) {

    console.error(error.message);
    res.status(500).send("Internal Server Error");

  }
  
});
      

//Route 3  : Get logged User Details using : Post "/api/auth/getuser". Login required----

router.post('/getuser', fetchUser, async(req, res) => {
try {
   
  userId ="req.user.id"
  const user = await User.findById(req.user.id).select("-password");
  res.send(user);
  
} catch (error) {

  console.error(error.message);
    res.status(500).send("Internal Server Error");
  
}
});
module.exports = router; 

