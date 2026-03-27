const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/editHome", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';

  Home.findById(homeId, (home) => {
    if (!home) {
      
      return res.redirect("/host/host-homes");
    }
    res.render("host/editHome", {
      home: home,
      pageTitle: "Edit Your Home",
      currentPage: "host-homes",
      editing: editing,
    });
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
    });
  });
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

exports.postEditHome = (req, res, next) => {
  const { id, houseName, location, price, rating, photoUrl } = req.body;
  const updatedData = { houseName, location, price, rating, photoUrl };

  console.log("Updating Home ID:", id); 
  Home.update(id, updatedData);
  res.redirect("/host/host-homes");
};


exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.deleteById(homeId, (err) => {
    if (err) {
      console.log("Delete Error:", err);
    }
  res.redirect("/host/host-homes");
    });
};