const express = require("express");
const router = express.Router();
const pool = require("../database");
const { isLogged } = require("../lib/auth");

let getUser = async (req, res, next) => {
  if (req.user) {
    //console.log(req.user);
    let infoUsuario = await pool.query(
      "SELECT * FROM vistausuarios WHERE id = ?",
      [req.user.id]
    );
    req.infoUsuario = infoUsuario;
  }
  next();
};


router.get("/inicio", [isLogged, getUser], (req, res) => {
  const infoUsuario = req.infoUsuario;

  res.render("index/inicio", {
    infoUsuario,
    title: "Inicio",
  });
});

router.get("/produccion", isLogged, (req, res) => {
  res.redirect("/produccioncorte");
});



router.get("/produccioncorte", [isLogged, getUser], async (req, res) => {
  const infoUsuario = req.infoUsuario;
  const tipoequipo = await pool.query(
    `SELECT id, nombre FROM vistaequipos WHERE turno = '${infoUsuario[0].turno}' AND estado = 1 ORDER BY nombre`
  ); 
  res.render("./index/produccion", {
    tipoequipo,
    infoUsuario,
    title: "Resumen de operaciones",
  });
});


router.get("/tablero", [isLogged, getUser], async (req, res) => {
  const infoUsuario = req.infoUsuario;
  if(infoUsuario[0].id_rol != 1){
    res.redirect(
      "/inicio", 
      400, 
      req.flash("messageError", "[Tablero]: Acceso denegado")
      );
  }else{
    res.render("index/tablero", {
      title: "Tablero",
      infoUsuario
    });
  }
  
});

router.get("/equipos", [isLogged, getUser], async (req, res) => {
  const infoUsuario = req.infoUsuario;

  const equipo = await pool.query("SELECT * FROM vistaequipos");
  const equipos = equipo.filter((item) => item.turno == infoUsuario[0].turno);
  const tipoequipo = await pool.query("SELECT * FROM tipo_equipo");

  if (infoUsuario[0].rol === "Administrador") {
    res.render("index/equipos", {
      equipos,
      tipoequipo,
      infoUsuario,
      title: "Equipos",
    });
  } else {
    res.render("index/equipos", {
      equipos,
      tipoequipo,
      infoUsuario,
      title: "Equipos",
    });
  }
});

router.get("/usuarios", [isLogged, getUser], async (req, res) => {
  const infoUsuario = req.infoUsuario;
  if(infoUsuario[0].id_rol != 1){
    res.redirect(
      "/inicio",
      400, 
      req.flash("messageError", "[Usuarios]: Acceso denegado")
      );
  }else{
    const usuarios = await pool.query("SELECT * FROM vistausuarios");
    const rol = await pool.query("SELECT * FROM roles ORDER BY id DESC");
  
    res.render("index/usuarios", {
      infoUsuario,
      usuarios,
      rol,
      title: "Usuarios",
    });
  }
});

router.get("/tipodeequipos", [isLogged, getUser], async (req, res) => {
  const infoUsuario = req.infoUsuario;
  const tipoequipo = await pool.query("SELECT * FROM tipo_equipo");
  const estandares = await pool.query("SELECT * FROM vistaestandares");
  const equipos = await pool.query("SELECT nombre FROM vistaequipos");

  res.render("index/ajustes", {
    infoUsuario,
    tipoequipo,
    estandares,
    equipos,
    title: "Tipos de equipo",
  });
});

router.get("/estandares", [isLogged, getUser], async (req, res) => {
  const infoUsuario = req.infoUsuario;
  const estandares = await pool.query("SELECT * FROM vistaestandares");
  const equipos = await pool.query("SELECT nombre FROM vistaequipos");
  const estandaresdeTurno = estandares.filter(
    (item) => item.turno == infoUsuario[0].turno
  );
  res.render("index/estandares", {
    infoUsuario,
    estandaresdeTurno,
    equipos,
    title: "Estandares",
  });
});

router.get("/configuracion", [isLogged, getUser], async (req, res) => {
  const infoUsuario = req.infoUsuario;
  const costoscrap = await pool.query("SELECT * FROM vistacostosscrap");
  if(infoUsuario[0].id_rol != 1){
    res.redirect(
      "/inicio",
      400,
      req.flash("messageError", "[Costos]: Acceso denegado.")
      );
  }else{
    res.render("index/configuraciones", {
      title: "Costos",
      infoUsuario,
      costoscrap
    });
  }
});


router.get("/tipodescrap", [isLogged, getUser], async (req, res) => {
  const infoUsuario = req.infoUsuario;
  const tiposcrap = await pool.query("SELECT * FROM tipo_scrap");
  res.render("index/tiposcrap",{
    title: "Tipo de scrap",
    infoUsuario,
    tiposcrap
  });
});

router.get('/perfil', [isLogged, getUser], (req, res) => {
    const infoUsuario = req.infoUsuario;
    res.render("index/perfil", {
      title: "Mi información de usuario",
      infoUsuario
    });
});

module.exports = router;
