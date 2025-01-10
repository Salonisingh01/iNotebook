const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body ,  validationResult } = require('express-validator');


//Create a user using POST "/api/auth/createuser"---doesn't require auth--
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
    
    //create a new user---
    const user = await User.create({  
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    
    res.json({user})
    
} catch(error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}}
);

module.exports = router;
