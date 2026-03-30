const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  houseName: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  rating: { type: Number },
  photoUrl: { type: String },
  description: { type: String },
});


homeSchema.pre("findOneAndDelete", async function () {
  const homeId = this.getQuery()["_id"];
  console.log("Pre-hook triggered for homeId:", homeId);

  try {
    const Favourite = mongoose.model("Favourite");
  
    await Favourite.deleteMany({ homeId: homeId });
    console.log("Associated favourites deleted successfully.");
  } catch (err) {
    console.log("Error in Pre-hook:", err);
    throw err; 
  }
});

const Home = mongoose.model("Home", homeSchema);
module.exports = Home;