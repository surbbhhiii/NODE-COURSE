//core module
const path = require('path');
//external module
const express = require('express');
const userRouter = express.Router();

//local module
const rootDir = require("../utils/pathUtil");


userRouter.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'home.html'));
});



  //(
   // `<h1> Welcome to airbnb </h1>
   // <a href="/host/add-home">Add Home</a>
   // `);


  module.exports = userRouter;