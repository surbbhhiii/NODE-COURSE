const fs = require('fs');
const path = require('path');


const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'homes.json'
);

module.exports = class Home {
  constructor(houseName, location, price, rating, photoUrl) {
    this.id = Math.random().toString(); 
    this.houseName = houseName;
    this.location = location;
    this.price = price;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  
  save() {
    Home.fetchAll(homes => {
      homes.push(this);
      fs.writeFile(p, JSON.stringify(homes), err => {
        if (err) console.log("Save Error:", err);
      });
    });
  }

  
  static fetchAll(callback) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        callback([]);
      } else {
        try {
          callback(JSON.parse(fileContent));
        } catch (e) {
          callback([]); 
        }
      }
    });
  }

  
  static deleteById(id, callback) {
    Home.fetchAll(homes => {
      const updatedHomes = homes.filter(h => h.id !== id);
      fs.writeFile(p, JSON.stringify(updatedHomes), err => {
        if (callback) callback(err);
      });
    });
  }

  
  static findById(id, callback) {
    Home.fetchAll(homes => {
      const home = homes.find(h => h.id === id);
      callback(home);
    });
  }

  static update(id, updatedData, callback) {
    Home.fetchAll(homes => {
      const index = homes.findIndex(h => h.id === id);
      if (index !== -1) {
      

        homes[index] = { ...updatedData, id: id };
        fs.writeFile(p, JSON.stringify(homes), err => {
          if (callback) callback(err);
        });
      }
    });
  }
};