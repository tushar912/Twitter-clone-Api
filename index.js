const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
// const profileRouter = require('./routes/profile');
// const tweetRouter = require('./routes/tweet');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
const app = express();
const port = process.env.PORT || 2000;
var passport = require('passport');
var authenticate = require('./authenticate');
app.use(bodyParser.json());
const url = 'mongodb://localhost:27017/twitter';

const connect = mongoose.connect(url,{ useNewUrlParser: true ,useUnifiedTopology: true });


connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); })

app.get("/", (req, res) => {
    res.send("Welcome to the Twitter API <br> Visit /api for the API functionality.");
});
app.use(session({
    name: 'session-id',
    secret: '12345-67890-09876-54321',
    saveUninitialized: false,
    resave: false,
    store: new FileStore()
  }));
app.use(passport.initialize());
app.use(passport.session());
function auth (req, res, next) {
    console.log(req.user);

    if (!req.user) {
      var err = new Error('You are not authenticated!');
      err.status = 403;
      next(err);
    }
    else {
          next();
    }
}
app.use("/api/user", userRouter);
// app.use("/api/profile", profileRouter);
// app.use("/api/tweet", tweetRouter);

app.listen(port, () => console.log("server running "));

