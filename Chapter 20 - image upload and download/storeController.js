const Favourite = require("../models/favourite");
const Home = require("../models/home");

// 🏠 INDEX PAGE (FIXED - NO REDIRECT LOOP)
exports.getIndex = (req, res, next) => {
  Home.find()
    .then((homes) => {
      res.render("store/index", {
        registeredHomes: homes,
        pageTitle: "Airbnb Home",
        currentPage: "index",
        isLoggedIn: req.session.isLoggedIn || false,
        user: req.session.user || null
      });
    })
    .catch((err) => console.log(err));
};

// 🏡 ALL HOMES (Guest)
exports.getHomes = (req, res, next) => {
  Home.find()
    .then((homes) => {
      res.render("store/home-list", {
        registeredHomes: homes,
        pageTitle: "Homes List",
        currentPage: "homes",
        isLoggedIn: req.session.isLoggedIn || false,
        user: req.session.user || null
      });
    })
    .catch((err) => console.log(err));
};

// 🏠 HOME DETAILS
exports.getHomesDetails = (req, res, next) => {
  Home.findById(req.params.homeId)
    .then((home) => {
      if (!home) return res.redirect("/homes");

      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Detail",
        currentPage: "homes",
        isLoggedIn: req.session.isLoggedIn || false,
        user: req.session.user || null
      });
    })
    .catch((err) => console.log(err));
};

// ❤️ FAVOURITES LIST
exports.getFavouriteList = (req, res, next) => {
  Favourite.find()
    .then((favs) => {
      const favIds = favs.map((f) => f.homeId);
      return Home.find({ _id: { $in: favIds } });
    })
    .then((favHomes) => {
      res.render("store/favourite-list", {
        favouriteList: favHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
        isLoggedIn: req.session.isLoggedIn || false,
        user: req.session.user || null
      });
    })
    .catch((err) => console.log(err));
};

// 📅 BOOKINGS
exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
    isLoggedIn: req.session.isLoggedIn || false,
    user: req.session.user || null
  });
};

// ❤️ ADD TO FAVOURITE
exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.homeId || req.body.id;

  if (!homeId) {
    return res.redirect("/homes");
  }

  const fav = new Favourite({ homeId });

  fav.save()
    .then(() => res.redirect("/favourites"))
    .catch((err) => console.log(err));
};

// ❌ DELETE FAVOURITE
exports.postDeleteFavourite = (req, res, next) => {
  const homeId = req.body.homeId || req.body.id;

  Favourite.deleteOne({ homeId })
    .then(() => res.redirect("/favourites"))
    .catch((err) => console.log(err));
};