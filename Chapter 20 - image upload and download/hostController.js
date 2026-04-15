const Home = require("../models/home");

// ================== GET ADD HOME ==================
exports.getAddHome = (req, res) => {
  res.render("host/editHome", {
    pageTitle: "Add Home",
    currentPage: "addHome",
    editing: false
  });
};

// ================== POST ADD HOME ==================
exports.postAddHome = (req, res) => {
  const { houseName, price, location, rating, description } = req.body;
  const image = req.file;

  if (!image) {
    console.log("No image uploaded ❌");
    return res.redirect("/host/add-home");
  }

  const photoUrl = "/uploads/" + image.filename;

  const home = new Home({
    houseName,
    price,
    location,
    rating,
    description,
    photoUrl,
    hostId: req.session.user._id
  });

  home.save()
    .then(() => {
      console.log("Home saved ✅");
      res.redirect("/host/host-home-list");
    })
    .catch(err => {
      console.log("Error saving home:", err);
      res.redirect("/host/add-home");
    });
};

// ================== GET HOST HOMES ==================
exports.getHostHomes = (req, res) => {
  Home.find({ hostId: req.session.user._id })
    .then(homes => {
      res.render("host/host-home-list", {
        registeredHomes: homes,
        pageTitle: "Host Homes",
        currentPage: "host-homes"
      });
    })
    .catch(err => console.log(err));
};

// ================== GET EDIT HOME ==================
exports.getEditHome = (req, res) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  if (!editing) return res.redirect("/");

  Home.findOne({ _id: homeId, hostId: req.session.user._id })
    .then(home => {
      if (!home) return res.redirect("/host/host-home-list");

      res.render("host/editHome", {
        pageTitle: "Edit Home",
        currentPage: "host-homes",
        editing: true,
        home: home
      });
    })
    .catch(err => console.log(err));
};

// ================== POST EDIT HOME ==================
exports.postEditHome = (req, res) => {
  const { homeId, houseName, price, location, rating, description } = req.body;
  const image = req.file;

  const updateData = {
    houseName,
    price,
    location,
    rating,
    description
  };

  if (image) {
    updateData.photoUrl = "/uploads/" + image.filename;
  }

  Home.findOneAndUpdate(
    { _id: homeId, hostId: req.session.user._id },
    updateData
  )
    .then(() => {
      console.log("Home updated ✅");
      res.redirect("/host/host-home-list");
    })
    .catch(err => {
      console.log("Update error:", err);
      res.redirect("/host/host-home-list");
    });
};

// ================== POST DELETE HOME ==================
exports.postDeleteHome = (req, res) => {
  const homeId = req.params.homeId;

  Home.deleteOne({ _id: homeId, hostId: req.session.user._id })
    .then(() => {
      console.log("Home deleted ✅");
      res.redirect("/host/host-home-list");
    })
    .catch(err => {
      console.log("Delete error:", err);
      res.redirect("/host/host-home-list");
    });
};