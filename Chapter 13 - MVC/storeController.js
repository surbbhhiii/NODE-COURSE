const Home = require("../models/home");

// 🏠 1. Home Page
exports.getIndex = (req, res, next) => {
  Home.fetchAll((homes) => {
    res.render("store/index", {
      registeredHomes: homes,
      pageTitle: "airbnb Home",
      currentPage: "index", 
    });
  });
};

// 🏠 2. Homes List
exports.getHomes = (req, res, next) => {
  Home.fetchAll((homes) => {
    res.render("store/home-list", {
      registeredHomes: homes,
      pageTitle: "Homes List",
      currentPage: "homes", 
    });
  });
};

// 📅 3. Bookings Page
exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings", 
  });
};

// ❤️ 4. Favourite Page
exports.getFavouriteList = (req, res, next) => {
  Home.getFavourites((favs) => {
    res.render("store/favourite-list", {
      favouriteList: favs, 
      pageTitle: "My Favourites",
      currentPage: "favourites", 
    });
  });
};

// ➕ 5. Add to Favourite Logic
exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.id;
  Home.addToFavourite(homeId);
  res.redirect("/favourites");
};