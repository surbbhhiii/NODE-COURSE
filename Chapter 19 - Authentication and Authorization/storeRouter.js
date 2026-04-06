const express = require("express");
const storeRouter = express.Router();
const storeController = require("../controllers/storeController");

// 1. Home / Index Page
storeRouter.get("/", storeController.getIndex);

// 2. All Homes List (Guest View)
storeRouter.get("/homes", storeController.getHomes);

// 3. Home Details Page
storeRouter.get("/homes/:homeId", storeController.getHomesDetails);

// 4. Favourites Section
storeRouter.get("/favourites", storeController.getFavouriteList);
storeRouter.post("/favourites", storeController.postAddToFavourite); 

// 5. Delete Favourite 
storeRouter.post("/delete-favourite", storeController.postDeleteFavourite);

// 6. Bookings Section
storeRouter.get("/bookings", storeController.getBookings);

module.exports = storeRouter;