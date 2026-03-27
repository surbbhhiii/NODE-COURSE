const path = require('path');
const express = require('express');

const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");

const app = express();

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body parser
app.use(express.urlencoded({ extended: true }));

// Static
app.use(express.static(path.join(rootDir, 'public')));

// ✅ ROUTES 
app.use("/host", hostRouter);
app.use("/", storeRouter);   



// 404
app.use(errorsController.pageNotFound);

// Server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});