const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");

const favouriteDataPath = path.join(rootDir, "data", "favourites.json");

module.exports = class Favourite {
  
  static addToFavourite(homeId, callback) {
    Favourite.getFavourites(favourites => {
      if (favourites.includes(homeId)) {
        callback("Home is already marked favourite");
      } else {
        favourites.push(homeId);
        fs.writeFile(favouriteDataPath, JSON.stringify(favourites), callback);
      }
    });
  }

  
  static getFavourites(callback) {
    fs.readFile(favouriteDataPath, (err, data) => {
      if (err) {
        return callback([]);
      }
      try {
        callback(JSON.parse(data));
      } catch (e) {
        callback([]);
      }
    });
  }

  static deleteById(id, callback) {
    Favourite.getFavourites(favourites => {
      
      const updatedFavourites = favourites.filter(favId => favId !== id);
      
      
      fs.writeFile(favouriteDataPath, JSON.stringify(updatedFavourites), (err) => {
        if (callback) callback(err);
      });
    });
  }
};