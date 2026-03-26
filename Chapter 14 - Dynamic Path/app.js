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

// ✅ ROUTES (FIXED ORDER)
app.use("/", storeRouter);   // 👈 IMPORTANT
app.use("/host", hostRouter);

// Static
app.use(express.static(path.join(rootDir, 'public')));

// 404
app.use(errorsController.pageNotFound);

// Server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
