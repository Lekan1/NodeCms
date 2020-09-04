/* Importing Different Modules */
const {
  globalVariables
} = require("./config/configuration");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
(_handlebars = require("handlebars")),
({
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access"));
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
const fileupload = require("express-fileupload");
const methodOverride = require("method-override");
const hbs = require("express-handlebars");
const {
  mongoDbUrl,
  PORT
} = require("./config/configuration");
const {
  selectOption
} = require("./config/customFunction");

const app = express();

// Configure Mongoose to Connect to MongoDB
mongoose
  .connect(mongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    console.log("MongoDB Connected Successfully.");
  })
  .catch((err) => {
    console.log("Database connection failed.");
  });

/* Configure express*/
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static(path.join(__dirname, "public")));

/* Setup View Engine To Use Handlebars */
app.engine(
  "handlebars",
  hbs({
    defaultLayout: "default",
    handlebars: allowInsecurePrototypeAccess(_handlebars),
    helpers: {
      select: selectOption,
    },
  })
);
app.set("view engine", "handlebars");
// CONNECT FLASH AND EXPRESS-SESSION MIDDLEWARE
app.use(
  session({
    secret: "anysecret",
    saveUninitialized: true,
    resave: true,
  })
);
/* Method Override Middleware*/
app.use(methodOverride("newMethod"));
app.use(flash());
app.use(passport.initialize());
// persistent login sessions 
app.use(passport.session())
app.use(globalVariables);
// MIDDLEWARE FOR FILEUPLOAD
app.use(fileupload());

/* Routes */
const defaultRoutes = require("./routes/defaultRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/", defaultRoutes);
app.use("/admin", adminRoutes);

/* Start The Server */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});