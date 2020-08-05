const router = require("express").Router();
const pool = require("../database");
const mylib = require("../lib/mylib");

router.post("/updateuser/:id", async (req, res) => {
  const { id } = req.params;
  const { usuario, email, telefono, turno } = req.body;
  const data = {
    usuario,
    email,
    telefono,
    turno,
  };
  pool
    .query("UPDATE usuarios SET ? WHERE id = ?", [data, id])
    .then((result) => {
      if (result.affectedRows > 0) {
        res.redirect(
          "/perfil",
          200,
          req.flash("success", "Cambios guardados con éxito.")
        );
      } else {
        res.redirect(
          "/perfil",
          400,
          req.flash(
            "messageError",
            "Error al intentar guardar los datos. Vuelve a intentarlo."
          )
        );
      }
    })
    .catch((err) => {
      req.redirect(
        "/perfil",
        500,
        req.flash(
          "messageError",
          "Error en el servidor. Contacta al desarrollador."
        )
      );
    });
});

router.post("/updatepassword/:id", async (req, res) => {
  const { id } = req.params;
  const { password, password2 } = req.body;
  
  if (password == password2) {

    const data = {
        password: await mylib.encryptPassword(password),
      };

    pool
      .query("UPDATE usuarios SET ? WHERE id = ?", [data, id])
      .then((result) => {
        if (result.affectedRows > 0) {
          res.redirect(
            "/perfil",
            200,
            req.flash("success", "Cambios guardados con éxito.")
          );
        } else {
          res.redirect(
            "/perfil",
            400,
            req.flash(
              "messageError",
              "Error al intentar guardar los datos. Vuelve a intentarlo."
            )
          );
        }
      })
      .catch((err) => {
        req.redirect(
          "/perfil",
          500,
          req.flash(
            "messageError",
            "Error en el servidor. Contacta al desarrollador."
          )
        );
      });
  }else{
      res.redirect("/perfil", 400, req.flash("messageError", "Las contraseñas no coinciden."))
  }
});

module.exports = router;
