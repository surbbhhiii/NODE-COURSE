// Core Modules
const path = require('path');

// External Modules
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

// Local Modules
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");

const app = express();

// ✅ MongoDB URL
const DB_PATH = "mongodb://msurbhi202_db_user:surbhi123@ac-c3qbkd5-shard-00-00.c10x09s.mongodb.net:27017,ac-c3qbkd5-shard-00-01.c10x09s.mongodb.net:27017,ac-c3qbkd5-shard-00-02.c10x09s.mongodb.net:27017/?ssl=true&replicaSet=atlas-t6bdyr-shard-0&authSource=admin&appName=surbhiji";

const store = new MongoDBStore({
  uri: DB_PATH,
  collection: 'sessions'
});

// ✅ View Engine Setup
app.set('view engine', 'ejs');
app.set('views', 'views');

// ✅ 1. Body Parser
app.use(express.urlencoded({ extended: true }));

// ✅ 2. Static Files (Public aur Uploads folder setup)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ 3. Session Setup
app.use(session({
  secret: "KnowledgeGate AI with Complete Coding",
  resave: false,
  saveUninitialized: false,
  store: store
}));

// ✅ 4. Global Variables Middleware (Isse saare EJS errors theek honge)
app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn || false;
  res.locals.user = req.session.user || null;
  res.locals.currentPage = req.path; 
  next();
});

// ✅ 5. Routers
app.use(authRouter);
app.use(storeRouter);

// ✅ 6. Host Auth Guard (Sirf login user host access kar sakein)
app.use("/host", (req, res, next) => {
  if (req.session.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use("/host", hostRouter);

// ✅ 7. 404 Page
app.use(errorsController.pageNotFound);

// ✅ Server Connection
const PORT = 3003;
mongoose.connect(DB_PATH)
  .then(() => {
    console.log('Connected to Mongo ✅');
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT} 🚀`);
    });
  })
  .catch(err => {
    console.log('Error while connecting to Mongo: ', err);
  });
