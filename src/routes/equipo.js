const express = require("express");
const router = express.Router();

const pool = require("../database");

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

router.post("/save", getUser, async (req, res) => {
  const infoUsuario = req.infoUsuario;
  const { tipoequipo, numero, nombre } = req.body;

  const data = {
    numero,
    nombre,
    id_tipoequipo: tipoequipo,
  };

  await pool
    .query("INSERT INTO equipo SET ?", [data])
    .then(async function (result) {
      if (result.affectedRows > 0) {
        const dataestandares = {
          id_equipo: result.insertId,
          turno: infoUsuario[0].turno,
        };
        
        if(dataestandares.turno == 'B'){

          const dataestandares2 = {
            id_equipo: result.insertId,
            turno: 'A'
          }
          await pool.query("INSERT INTO estandares SET ?", [dataestandares]);
          await pool.query("INSERT INTO estandares SET ?", [dataestandares2])
        }else{
          const dataestandares2 = {
            id_equipo: result.insertId,
            turno: 'B'
          }
          await pool.query("INSERT INTO estandares SET ?", [dataestandares]);
          await pool.query("INSERT INTO estandares SET ?", [dataestandares2])
        }
        
        return res.redirect(
          "/equipos",
          201,
          req.flash("success", "Equipo guardado con exito.")
        );
      } else {
        return res.redirect(
          "/equipos",
          400,
          req.flash("messageError", "Error al intentar guardar el equipo.")
        );
      }
    })
    .catch(function (e) {
      return res.redirect(
        "/equipos",
        500,
        req.flash(
          "messageError",
          "Error en el servidor. Consulta al desarrollador."
        )
      );
    });
});

router.get("/disable/:id", async (req, res) => {
  await pool
    .query("UPDATE equipo SET estado = false WHERE id = ?", [req.params.id])
    .then(function (result) {
      if (result.affectedRows > 0) {
        return res.redirect(
          "/equipos",
          201,
          req.flash("success", "El equipo a sido deshabilitado.")
        );
      } else {
        return res.redirect(
          "/equipos",
          400,
          req.flash("messageError", "Error al intentar deshabilitar el equipo.")
        );
      }
    })
    .catch(function (e) {
      return res.redirect(
        "/equipos",
        500,
        req.flash(
          "messageError",
          "Error en el servidor. Consulta al desarrollador."
        )
      );
    });
});

router.get("/enable/:id", async (req, res) => {
  await pool
    .query("UPDATE equipo SET estado = true WHERE id = ?", [req.params.id])
    .then(function (result) {
      if (result.affectedRows > 0) {
        return res.redirect(
          "/equipos",
          201,
          req.flash("success", "El equipo a sido habilitado.")
        );
      } else {
        return res.redirect(
          "/equipos",
          400,
          req.flash("messageError", "Error al intentar habilitar el equipo.")
        );
      }
    })
    .catch(function (e) {
      return res.redirect(
        "/equipos",
        500,
        req.flash(
          "messageError",
          "Error en el servidor. Consulta al desarrollador."
        )
      );
    });
});

router.post("/update/:id", getUser, async (req, res) => {
  const infoUsuario = req.infoUsuario;

  const { id } = req.params;
  const { tipoequipo, numero, nombre } = req.body;

  const data = {
    numero,
    nombre,
    id_tipoequipo: tipoequipo,
  };

  try {
    const result = await pool.query("UPDATE equipo SET ? WHERE id = ?", [
      data,
      id,
    ]);

    if (result.affectedRows > 0) {
      return res.redirect(
        "/equipos",
        201,
        req.flash("success", "El equipo a sido modificado.")
      );
    } else {
      return res.redirect(
        "/equipos",
        400,
        req.flash("messageError", "Error al intentar modificar el equipo.")
      );
    }
  } catch (e) {
    try {
      const secondata = {
        numero,
        nombre,
      };
      const secondresult = await pool.query(
        "UPDATE equipo SET ? WHERE id = ?",
        [secondata, id]
      );
      if (secondresult.affectedRows > 0) {
        return res.redirect(
          "/equipos",
          201,
          req.flash("success", "El equipo a sido modificado.")
        );
      } else {
        return res.redirect(
          "/equipos",
          400,
          req.flash("messageError", "Error al intentarmodificar el equipo 2.")
        );
      }
    } catch (err) {
      return res.redirect(
        "/equipos",
        500,
        req.flash(
          "messageError",
          "Error de servidor. Contacte al desarrollador."
        )
      );
    }
  }
});

router.get("/estandar", getUser, async (req, res) => {
  const infoUsuario = req.infoUsuario;
  const result = await pool.query("SELECT * FROM estandares WHERE turno = ?", [
    infoUsuario[0].turno,
  ]);
  res.json({ equipos: result });
});

router.get("/scrap", getUser, async (req, res) => {
  const infoUsuario = req.infoUsuario;
  const result = await pool.query("SELECT * FROM estandares WHERE turno = ?", [
    infoUsuario[0].turno,
  ]);
  res.json({ equipos: result });
});

router.get("/costo", getUser, async (req, res) => {
  const infoUsuario = req.infoUsuario;
  console.log(req.body.tipo);
  const result = await pool.query("SELECT costo FROM costos_scrap where id_tipo = ?", [
    req.body.tipo
  ]);
  res.json({ costos: result });
});

module.exports = router;
