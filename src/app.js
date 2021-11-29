require('dotenv').config();
const createError = require("http-errors");
const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require("cookie-parser");
const logger = require("morgan");

/*===================================================================*/
//Ejecuto el llamado a mis rutas

const usersRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const charactersRouter = require("./routes/charactersRouter");
const moviesRouter = require('./routes/moviesRouter');
const genresRouter = require('./routes/genresRouter');
const security = require("./middlewares/tokenMiddlware");


// view engine setup
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');


//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
/* app.use(express.static(path.join(__dirname, "images"))); */


app.use("/auth", authRouter);
app.use(security.tokenVerify);
app.use("/users", usersRouter);
app.use("/characters", charactersRouter);
app.use("/movies", moviesRouter);
app.use("/genres", genresRouter);


app.listen(3000);
console.log("Express app started on port 3000");



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;