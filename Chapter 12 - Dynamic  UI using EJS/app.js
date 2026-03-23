//core module
const path = require('path');

//external module
const express = require('express');

//local module
const userRouter = require("./routes/userRouter");
const {hostRouter} = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");

const app = express();

app.set('view engine', 'ejs');
//app.set('views', 'views');

app.set('views', path.join(__dirname, 'views'));



  app.use(express.urlencoded());
  app.use(userRouter);
  app.use("/host", hostRouter);

  app.use(express.static(path.join(rootDir, 'public')));

  app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page Not Found'});

  })



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});

