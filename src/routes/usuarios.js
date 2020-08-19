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

router.get("/disable/:id", async (req, res) => {
  const rows = await pool.query(
    "UPDATE usuarios SET estado = false WHERE id = ?",
    [req.params.id]
  );
  if (rows.affectedRows > 0) {
    return res.redirect(
      "/usuarios",
      201,
      req.flash("success", "El usuario a sido deshabilitado")
    );
  } else {
    return res.redirect(
      "/usuarios",
      400,
      req.flash(
        "messageError",
        "A ocurrido un error al intentar desabiitar al usuario"
      )
    );
  }
});

router.get("/enable/:id", async (req, res) => {
  const rows = await pool.query(
    "UPDATE usuarios SET estado = true WHERE id = ?",
    [req.params.id]
  );
  if (rows.affectedRows > 0) {
    return res.redirect(
      "/usuarios",
      201,
      req.flash("success", "El usuario a sido habilitado")
    );
  } else {
    return res.redirect(
      "/usuarios",
      400,
      req.flash(
        "messageError",
        "A ocurrido un error al intentar habilitar al usuario"
      )
    );
  }
});

router.post("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { email, telefono, rol, turno } = req.body;

  const data = {
    email,
    telefono,
    id_rol: rol,
    turno,
  };
  
  try {
    
    const result = await pool.query("UPDATE usuarios SET ? WHERE id = ?", [
      data,
      id,
    ]);

    if (result.affectedRows > 0) {
      return res.redirect(
        "/usuarios",
        201,
        req.flash("success", "El usuario a sido actualizado")
      );
    } else {
      return res.redirect(
        "/usuarios",
        400,
        req.flash(
          "messageError",
          "A ocurrido un error al intentar actualizarr al usuario"
        )
      );
    }
  } catch (e) {
    try {

      const secondata = { email, telefono, turno };
      const secondresult = await pool.query(
        "UPDATE usuarios SET ? WHERE id = ?",
        [secondata, id]
      );
      if (secondresult.affectedRows > 0) {
        return res.redirect(
          "/usuarios",
          201,
          req.flash("success", "El usuario a sido actualizado")
        );
      } else {
        return res.redirect(
          "/usuarios",
          400,
          req.flash(
            "messageError",
            "A ocurrido un error al intentar actualizarr al usuario"
          )
        );
      }
      /*console.log('Primer error');
        console.log(e);
        return res.redirect('/usuarios', 400, req.flash('messageError', 'Error. Vuelve a intentarlo. Si el problema persiste consulta con la persona a cargo de la aplicación.'));*/
    } catch (err) {
      try {
        const thirdata = { email, telefono, id_rol: rol, turno };
        const thirdresult = await pool.query(
          "UPDATE usuarios SET ? WHERE id = ?",
          [thirdata, id]
        );
        if (thirdresult.affectedRows > 0) {
          return res.redirect(
            "/usuarios",
            201,
            req.flash("success", "El usuario a sido actualizado")
          );
        } else {
          return res.redirect(
            "/usuarios",
            400,
            req.flash(
              "messageError",
              "A ocurrido un error al intentar actualizarr al usuario"
            )
          );
        }
      } catch (errr) {
        const forthdata = { email, telefono, turno };
        const forthresult = await pool.query(
          "UPDATE usuarios SET ? WHERE id = ?",
          [forthdata, id]
        );
        if (forthresult.affectedRows > 0) {
          return res.redirect(
            "/usuarios",
            201,
            req.flash("success", "El usuario a sido actualizado")
          );
        } else {
          return res.redirect(
            "/usuarios",
            400,
            req.flash(
              "messageError",
              "A ocurrido un error al intentar actualizarr al usuario"
            )
          );
        }
      }
    }
  }
});

router.get("/data", getUser, async (req, res) => {
  const infoUsuario = req.infoUsuario;
  res.json(infoUsuario[0].turno);
});

module.exports = router;
