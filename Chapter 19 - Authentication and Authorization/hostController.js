const Home = require("../models/home");

// 1. Add Home Page (GET)
exports.getAddHome = (req, res) => {
  res.render("host/editHome", {
    pageTitle: "Add Home",
    currentPage: "addHome", 
    editing: false,
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user
  });
};

// 2. Post Add Home (POST)
exports.postAddHome = (req, res) => {
  const { houseName, price, location, rating, photoUrl, description } = req.body;
  
  
  const home = new Home({
    houseName,
    price,
    location,
    rating,
    photoUrl,
    description,
    hostId: req.session.user._id 
  });

  home.save()
    .then(() => {
      res.redirect("/host/host-home-list"); 
    })
    .catch(err => {
      console.log("Error while saving home:", err);
      res.redirect("/");
    });
};

// 3. Get Host Homes (GET)
exports.getHostHomes = (req, res) => {
  
  Home.find({ hostId: req.session.user._id }) 
    .then((homes) => {
      res.render("host/host-home-list", {
        registeredHomes: homes,
        pageTitle: "Host Homes",
        currentPage: "host-homes",
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user
      });
    })
    .catch(err => console.log(err));
};

// 4. Edit Home Page (GET)
exports.getEditHome = (req, res) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';

  if (!editing) {
    return res.redirect("/");
  }

  // Security FIX
  Home.findOne({ _id: homeId, hostId: req.session.user._id })
    .then((home) => {
      if (!home) {
        return res.redirect("/host/host-home-list");
      }

      res.render("host/editHome", {
        home: home,
        pageTitle: "Edit Home",
        currentPage: "host-homes",
        editing: editing,
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user
      });
    })
    .catch(err => console.log(err));
};

// 5. Post Edit Home (POST)
exports.postEditHome = (req, res) => {
  const { homeId, houseName, price, location, rating, photoUrl, description } = req.body;

  
  Home.findOneAndUpdate(
    { _id: homeId, hostId: req.session.user._id }, 
    { houseName, price, location, rating, photoUrl, description }
  )
  .then(() => {
    res.redirect("/host/host-home-list");
  })
  .catch(err => {
    console.log("Error while updating home:", err);
    res.redirect("/host/host-home-list");
  });
};

// 6. Delete Home (POST)
exports.postDeleteHome = (req, res) => {
  const homeId = req.params.homeId;

  
  Home.deleteOne({ _id: homeId, hostId: req.session.user._id })
    .then(() => {
      console.log("Home Deleted Successfully");
      res.redirect("/host/host-home-list");
    })
    .catch(err => console.log(err));
};