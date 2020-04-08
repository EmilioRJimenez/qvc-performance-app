const express = require('express');
const router = express.Router();

const pool = require('../database');

router.post('/save', async (req, res) => {
    const user = req.user.id;

    const {
        turno, equipo, numeroequipo, piezas, cct, cst, terminal,
        errores, defectos, calidad, mantenimiento, materiales, cdd,
        procesos, enrredos, atorones, sello, setupa, setupb, setupc,
        setupd, ajuste
    } = req.body;

    const realequipo = await pool.query('SELECT id FROM equipo WHERE (numero = ?) AND (id_tipoequipo = ?)', [numeroequipo, equipo]);

    if(realequipo.length > 0){

        const idEquipo = realequipo[0].id;

        const datosProduccion = {
            idEquipo, piezas, turno, user
        };

        const datosCalidad = {
            idEquipo, turno, cst, cct, terminal, errores, defectos, user
        }

        const datosTiempoMuerto = {
            idEquipo, turno, calidad, mantenimiento, materiales, cdd, procesos, enrredos, atorones, sello, setupa, setupb, setupc, setupd, ajuste, user
        }



    }else{
        return res.redirect('/produccion', 500, req.flash('messageError', 'El equipo que ingreso no existe. Vuelve a intentarlo.'));
    }


    res.send('saved');
});

module.exports = router;