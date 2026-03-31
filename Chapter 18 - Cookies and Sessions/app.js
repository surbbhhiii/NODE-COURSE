const path = require('path');
const express = require('express');
const mongoose = require('mongoose'); 
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");

const app = express();
const PORT = 3000;
const DB_PATH = "mongodb://msurbhi202_db_user:surbhi123@ac-c3qbkd5-shard-00-00.c10x09s.mongodb.net:27017,ac-c3qbkd5-shard-00-01.c10x09s.mongodb.net:27017,ac-c3qbkd5-shard-00-02.c10x09s.mongodb.net:27017/?ssl=true&replicaSet=atlas-t6bdyr-shard-0&authSource=admin&appName=surbhiji";

const store = new MongoDBStore({
    uri: DB_PATH,
    collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(rootDir, 'public')));
app.use(express.urlencoded({ extended: true }));

// Session Setup
app.use(session({
    secret: 'my-very-long-secret-key',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// Global Variables for EJS
app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn || false;
    next();
});

// Sahi Terminal Logger (True/False check karne ke liye)
app.use((req, res, next) => {
    console.log('Login Status:', req.session.isLoggedIn === true ? "TRUE ✅" : "FALSE ❌");
    next();
});

app.use(authRouter);
app.use(storeRouter);

// Host Guard
app.use("/host", (req, res, next) => {
    if (req.session.isLoggedIn) {
        next();
    } else {
        res.redirect("/login");
    }
});
app.use("/host", hostRouter);

app.use(errorsController.pageNotFound);

mongoose.connect(DB_PATH)
    .then(() => {
        console.log('Connected to Mongo & Sessions Store');
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    })
    .catch(err => console.log('DB Error:', err));
