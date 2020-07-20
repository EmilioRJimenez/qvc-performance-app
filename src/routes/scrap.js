const router = require("express").Router();
const pool = require("../database");


router.post("/savetiposcrap", async (req, res) => {
    let { nombre } = req.body;
    nombreTipo = {
        nombre
    }
    await pool.query("INSERT INTO tipo_scrap SET ?", [nombreTipo])
    .then(async function(result){
        if(result.affectedRows > 0){
            const lastId = result.insertId;
            const data = {
                id_tipo: lastId
            }
            await pool.query("INSERT INTO costos_scrap SET ?", [data]);
            res.redirect(
                "/tipodescrap", 
                201, 
                req.flash("success", "Datos guardados con exito")
            );
        }else{
            res.redirect(
                "/tipodescrap", 
                400, 
                req.flash("messageError", "Error al intentar guardar los datos. Vuelve a intentarlo")
            );
        }
    }).catch(function(err){
        res.redirect("/tipodescrap",
        500, 
        req.flash("messageError", "Error en el servidor. Consulta al desarrollador.")
        );
    })
});

router.post("/updatetiposcrap/:id", async (req, res) => {
    const {id} = req.params;
    const { nombre } = req.body;
    const data = {
        nombre
    }
    await pool.query("UPDATE tipo_scrap SET ? WHERE id = ?", [data, id])
    .then(result => {
        if(result.affectedRows > 0){
            res.redirect(
                "/tipodescrap", 
                200, 
                req.flash("success", "Datos grabados con exito.")
            );
        }else{
            res.redirect(
                "/tipodescrap",
                400,
                req.flash("messageError", "Error al intentar grabar los datos. Vuelve a intentarlo")
            );
        }
    }).catch(function(err){
        res.redirect("/tipodescrap",
        500, 
        req.flash("messageError", "Error en el servidor. Consulta al desarrollador.")
        );
    });
});

router.get("/disable/:id", async (req, res) => {
    await pool
      .query("UPDATE tipo_scrap SET estado = false WHERE id = ?", [req.params.id])
      .then(function (result) {
        if (result.affectedRows > 0) {
          return res.redirect(
            "/tipodescrap",
            201,
            req.flash("success", "El tipo de scrap a sido deshabilitado.")
          );
        } else {
          return res.redirect(
            "/tipodescrap",
            400,
            req.flash("messageError", "Error al intentar deshabilitar el tipo de scrap.")
          );
        }
      })
      .catch(function (e) {
        return res.redirect(
          "/tipodescrap",
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
      .query("UPDATE tipo_scrap SET estado = true WHERE id = ?", [req.params.id])
      .then(function (result) {
        if (result.affectedRows > 0) {
          return res.redirect(
            "/tipodescrap",
            201,
            req.flash("success", "El tipo de scrap a sido habilitado.")
          );
        } else {
          return res.redirect(
            "/tipodescrap",
            400,
            req.flash("messageError", "Error al intentar habilitar el tipo de scrap.")
          );
        }
      })
      .catch(function (e) {
        return res.redirect(
          "/tipodescrap",
          500,
          req.flash(
            "messageError",
            "Error en el servidor. Consulta al desarrollador."
          )
        );
      });
  });


module.exports = router;