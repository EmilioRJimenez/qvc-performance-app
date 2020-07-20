const router = require("express").Router();
const pool = require("../database");

router.post("/update/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const updateData = {
    estandar: data.estandar,
    estandar_scrap: data.estandar_scrap,
  };

  await pool
    .query("UPDATE estandares SET ? WHERE id = ?", [updateData, id])
    .then(function (result) {
      if (result.affectedRows > 0) {
        res.redirect(
          "/estandares",
          200,
          req.flash("success", "Los datos fuerón guardados con exito.")
        );
      } else {
        res.redirect(
          "/estandares",
          400,
          req.flash(
            "messageError",
            "Error al guardar los datos. Vuelve a intentarlo."
          )
        );
      }
    })
    .catch(function () {
      res.redirect(
        "/estandares",
        500,
        req.flash(
          "messageError",
          "Error en el servidor. Consulta al desarrollador."
        )
      );
    });
});

module.exports = router;
