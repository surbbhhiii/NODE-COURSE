const express = require("express");
const storeRouter = express.Router();
const homesController = require("../controllers/storeController");

storeRouter.get("/", homesController.getIndex);
storeRouter.get("/homes", homesController.getHomes);
storeRouter.get("/bookings", homesController.getBookings);

// 1. Favourite Page dikhane ke liye (GET)
storeRouter.get("/favourites", homesController.getFavouriteList);

// 2. Favourite save karne ke liye (POST) 👈 YE MISSING THA
storeRouter.post("/favourites", homesController.postAddToFavourite); 

module.exports = storeRouter;