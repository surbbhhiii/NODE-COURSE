const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.find()
    .then((homes) => {
      res.render("store/index", { registeredHomes: homes, pageTitle: "airbnb Home", currentPage: "index" });
    })
    .catch((err) => console.log(err));
};

exports.getHomes = (req, res, next) => {
  Home.find()
    .then((homes) => {
      res.render("store/home-list", { registeredHomes: homes, pageTitle: "Homes List", currentPage: "homes" });
    })
    .catch((err) => console.log(err));
};

exports.getHomesDetails = (req, res, next) => {
  Home.findById(req.params.homeId)
    .then((home) => {
      res.render("store/home-detail", { home: home, pageTitle: "Home Detail", currentPage: "homes" });
    })
    .catch((err) => console.log(err));
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.find()
    .then((favs) => {
      const favIds = favs.map(f => f.homeId);
      return Home.find({ _id: { $in: favIds } });
    })
    .then((favHomes) => {
      res.render("store/favourite-list", { favouriteList: favHomes, pageTitle: "My Favourites", currentPage: "favourites" });
    })
    .catch((err) => console.log(err));
};

exports.postAddToFavourite = (req, res, next) => {
  
  const homeId = req.body.homeId || req.body.id; 

  if (!homeId) {
    console.log("Error: homeId not found in request body");
    return res.redirect("/homes");
  }

  const fav = new Favourite({ homeId: homeId });
  fav.save()
    .then(() => res.redirect("/favourites"))
    .catch((err) => console.log("Fav Save Error:", err));
};

exports.postDeleteFavourite = (req, res, next) => {
  const homeId = req.body.homeId || req.body.id;
  Favourite.deleteOne({ homeId: homeId })
    .then(() => res.redirect("/favourites"))
    .catch((err) => console.log(err));
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", { pageTitle: "My Bookings", currentPage: "bookings" });
};