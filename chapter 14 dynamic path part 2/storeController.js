const Favourite = require("../models/favourite");
const Home = require("../models/home");

// 🏠 1. Home Page (Index)
exports.getIndex = (req, res, next) => {
  Home.fetchAll((homes) => {
    res.render("store/index", {
      registeredHomes: homes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    });
  });
};

// 🏠 2. All Homes List
exports.getHomes = (req, res, next) => {
  Home.fetchAll((homes) => {
    res.render("store/home-list", {
      registeredHomes: homes,
      pageTitle: "Homes List",
      currentPage: "homes",
    });
  });
};

// 🔍 3. Home Details Page
exports.getHomesDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId, (home) => {
    if (!home) {
      console.log("Home not found");
      return res.redirect("/homes");
    }
    res.render("store/home-detail", {
      home: home,
      pageTitle: "Home Detail",
      currentPage: "homes",
    });
  });
};


exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourites((favIds) => {
    Home.fetchAll((allHomes) => {
      
      const favHomes = allHomes.filter((home) => favIds.includes(home.id));

      res.render("store/favourite-list", {
        favouriteList: favHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
      });
    });
  });
};


exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.id;
  Favourite.addToFavourite(homeId, (error) => {
    if (error) {
      console.log("Error while marking favourite:", error);
    }
    res.redirect("/favourites");
  });
};

// 📅 6. Bookings Page
exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  });
};


exports.postDeleteFavourite = (req, res, next) => {
  const homeId = req.body.id; 
  
  Favourite.deleteById(homeId, (err) => {
    if (err) {
      console.log("Error removing from favourites:", err);
    }
    
    res.redirect("/favourites");
  });
};