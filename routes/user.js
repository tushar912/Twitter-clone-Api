const express = require('express');
const  userRouter= express.Router();

const passport = require('passport');
const User = require('../models/user');
const { body,validationResult} = require('express-validator');
const authenticate= require('../authenticate');

userRouter.post('/signup',[
   body('email').isEmail(),
   body('password').isLength({ min: 5 })
],(req,res)=>{
    
  
    User.register(new User({username: req.body.username,email:req.body.email}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Registration Successful!'});
      });
    }
  })
})
userRouter.post('/login',[
  body('email').isEmail(),
  body('password').isLength({ min: 5 })
],passport.authenticate('local'),(req,res)=>{
  var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true,token:token, status: 'You are successfully logged in!'});
  })

  module.exports = userRouter;