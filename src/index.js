const express = require("express");
const morgan = require("morgan");
const hbs = require("express-handlebars");
const path = require("path");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const mySQLStore = require("express-mysql-session");
const { isNotLogged } = require("./lib/auth");

const { database } = require("./keys");

const pool = require("./database");

//Inicializaciones
const app = express();
require("./lib/passport");

//Configuraciones
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  "hbs",
  hbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: "hbs",
    helpers: require("./lib/handlebars"),
  })
);
app.set("view engine", "hbs");

//Middlewares
app.use(
  session({
    secret: "aptiv",
    resave: false,
    saveUninitialized: false,
    store: new mySQLStore(database),
  })
);
app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

//Variables globales
app.use((req, res, next) => {
  app.locals.success = req.flash("success");
  app.locals.messageError = req.flash("messageError");
  app.locals.user = req.user;
  app.locals.rol = req.rol;
  app.locals.infoUsuario;
  next();
});

//Rutas


app.use("/", require("./routes/index"));
app.use("/", require("./routes/auth"));
app.use("/produccion", require("./routes/produccion"));
app.use("/equipos", require("./routes/equipo"));
app.use("/usuarios", require("./routes/usuarios"));
app.use("/otros", require("./routes/otros"));
app.use("/query", require("./routes/querys"));
app.use("/estandares", require("./routes/estandares"));
app.use("/tiposcrap", require("./routes/scrap"));
app.use("/costoscrap", require("./routes/costoscrap"));

//Archivos publicos
app.use(express.static(path.join(__dirname, "public")));

//Inicializando el servidor
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
