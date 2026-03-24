const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/addHome", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
    })
  );
};

exports.postAddHome = (req, res, next) => {
  const { houseName, location, price, rating, photoUrl } = req.body;
  const home = new Home(houseName, location, price, rating, photoUrl);
  home.save();

  res.render("host/homeAdded", {
    pageTitle: "Home Added Successfully",



    currentPage: "homeAdded",
  });
};





