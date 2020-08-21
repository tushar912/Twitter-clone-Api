const express = require('express');
const tweetRouter = express.Router();
const User = require('../models/user');
const Follow = require('../models/follows');
const Tweet = require('../models/tweet');
const auth = require('../authenticate')

tweetRouter.post('/',auth.verifyUser,(req,res)=>{
    const tweet = new Tweet;
    tweet.author= req.user._id;
    tweet.body = req.body.body;
    tweet.save().then(res.json({ status: "success", _id: tweet._id }))
    .catch((err)=>{
        console.log(err);
    })
    
})
tweetRouter.get('/:id',auth.verifyUser,(req,res)=>{
    Tweet.findById(req.params.id).then((tweet)=>{
        if(!tweet){
            return res.json('no tweet');
        }
        if(tweet.author.toString() !== req.user._id.toString()){
            return res.json("not authorized");
        }
        res.json(tweet)
    })
})
tweetRouter.delete('/:id',auth.verifyUser,(req,res)=>{
    Tweet.findById(req.params.id).then((tweet)=>{
        if(!tweet){
            return res.json('no tweet');
        }
        if(tweet.author.toString() !== req.user._id.toString()){
            return res.json("not authorized");
        }
        return tweet.remove();
    }).then((tweet)=>{
        res.json("deleted");
    })
    .catch((err)=>{
res.json(err);
    })
})
module.exports = tweetRouter;