const express = require('express');
const  userRouter= express.Router();

const passport = require('passport');
const User = require('../models/user');
const { body,validationResult} = require('express-validator');

userRouter.post('/signup',(req,res)=>{
    
  
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
userRouter.post('/login',passport.authenticate('local'),(req,res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, status: 'You are successfully logged in!'});
  })

  module.exports = userRouter;