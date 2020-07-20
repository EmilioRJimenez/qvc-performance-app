const router = require("express").Router();
const pool = require("../database");



router.post("/updatecosto/:id", async (req, res) => {
    const { id } = req.params;
    const { costo } = req.body;

    const data = {
        costo
    }
    await pool.query("UPDATE costos_scrap SET ? WHERE id = ?", [data, id])
    .then(function(result){
        if(result.affectedRows > 0){
            res.redirect(
                "/configuracion",
                200,
                req.flash("success", "Datos grabados con exito.")
            );
        }else{
            res.redirect(
                "/configuracion",
                400,
                req.flash("messageError", "Error al intentar grabar los datos. Vuelve a intentarlo.")
            );
        }
    }).catch(function(err){
        res.redirect(
            "/configuracion",
            500,
            req.flash("messageError", "Error en el servidor. Consulta al desarrollador.")
        );
    });
});


module.exports = router;