const express = require('express');
const  userRouter= express.Router;

const passport = require('passport');

const { body, validationResult } = require('express-validator');