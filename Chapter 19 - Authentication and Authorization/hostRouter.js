const express = require("express");
const hostRouter = express.Router();
const hostController = require("../controllers/hostController");

// 1. Add Home - (/host/add-home)
hostRouter.get("/add-home", hostController.getAddHome);
hostRouter.post("/add-home", hostController.postAddHome);

// 2. Host Homes List 
hostRouter.get("/host-home-list", hostController.getHostHomes);

// 3. Edit Home - (/host/edit-home/:homeId)
hostRouter.get("/edit-home/:homeId", hostController.getEditHome);

// 4. Update Home - (/host/edit-home)
hostRouter.post("/edit-home", hostController.postEditHome);

// 5. Delete Home - (/host/delete-home/:homeId)
hostRouter.post("/delete-home/:homeId", hostController.postDeleteHome);

module.exports = hostRouter;