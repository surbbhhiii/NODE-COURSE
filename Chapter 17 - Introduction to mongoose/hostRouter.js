const express = require("express");
const hostRouter = express.Router();
const hostController = require("../controllers/hostController");

// 1. Add Home
hostRouter.get("/add-home", hostController.getAddHome);
hostRouter.post("/add-home", hostController.postAddHome);

// 2. Host Homes List
hostRouter.get("/host-homes", hostController.getHostHomes);

// 3. Edit Home 
hostRouter.get("/edit-home/:homeId", hostController.getEditHome);

// 4. Edit Home 
hostRouter.post("/edit-home", hostController.postEditHome);

// 5. Delete Home
hostRouter.post("/delete-home/:homeId", hostController.postDeleteHome);

module.exports = hostRouter;