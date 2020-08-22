const express = require('express');
const followRouter = express.Router();
const User = require('../models/user');
const Follows = require('../models/follows');


followRouter.post('/:id/follow',(req,res)=>{
    User.findById(req.params.id).then((user)=>{
        if(user){
            if(req.user.id.toString()==req.params.id ){
                return res.json("cant follow urself");
              }
              return Follows.findOne({$and:[ { followee: req.user.id }, { follower: req.params.id }]})
        }
        
    }).then((follower)=>{
        if(follower){
            return res.json("already a follower");
                    }
                    const follows = new Follows;
                    follows.followee = req.user.id;
                    follows.follower= req.params.id;
                    return follows.save();
    }).then((follow)=>{
        res.json("success");
    }).catch((err)=>{
        res.status(404);
        res.json(err);
    })
})
followRouter.post('/:id/unfollow',(req,res)=>{
    User.findById(req.params.id).then((user)=>{
       if(user){
        return Follows.findOne({$and:[{ followee: req.user.id}, { follower: req.params.id }]})
       }
        
    }).then((follower)=>{
        if(!follower){
            return res.json('not follower');
        }
        return follower.remove();
    }).then((follower)=>{
        return res.json("deleted follower");
    }).catch((err)=>{
        res.status(404)
        res.json(err);
    })
})
module.exports = followRouter;