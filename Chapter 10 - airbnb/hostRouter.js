//core module
const path = require('path');

const express = require('express');
const hostRouter = express.Router();

const rootDir = require("../utils/pathUtil");

hostRouter.get("/add-home", (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'addHome.html'));

  //res.send(`
   // <h1> Register your home here: </h1>
   // <form action="/host/add-home" method="POST">
    //  <input type="text" name="houseName" placeholder="Enter your name of your house" />
    //  <input type="submit"/>
     // </form>

     // `);
})

hostRouter.post("/add-home", (req, res, next) =>{
  res.sendFile(path.join(rootDir, 'views', 'homeAdded.html'));

  //console.log(req.body);
  //res.send(`
    //<h1> Home Registered successfully </h1>
   // <a href="/">Go to Home</a>

   // `);
})

module.exports = hostRouter;