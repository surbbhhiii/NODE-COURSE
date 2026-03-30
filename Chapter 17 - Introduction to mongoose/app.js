const path = require('path');
const express = require('express');
const mongoose = require('mongoose'); 

const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(rootDir, 'public')));


app.use(express.urlencoded({ extended: true }));


app.use(storeRouter);
app.use("/host", hostRouter);


app.use(errorsController.pageNotFound);

const PORT = 3000;
const DB_PATH = "mongodb://msurbhi202_db_user:surbhi123@ac-c3qbkd5-shard-00-00.c10x09s.mongodb.net:27017,ac-c3qbkd5-shard-00-01.c10x09s.mongodb.net:27017,ac-c3qbkd5-shard-00-02.c10x09s.mongodb.net:27017/?ssl=true&replicaSet=atlas-t6bdyr-shard-0&authSource=admin&appName=surbhiji";

mongoose.connect(DB_PATH)
  .then(() => {
    console.log('Connected to Mongo');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.log('Error while connecting to Mongo: ', err);
  });
