const express = require('express');
const router = express.Router();

const pool = require('../database');

let getUser = (async (req, res, next) => {
    if(req.user){
        //console.log(req.user);
        let infoUsuario = await pool.query('SELECT * FROM vistausuarios WHERE id = ?', [req.user.id]);
        req.infoUsuario = infoUsuario;
    }
    next();
});


router.post('/save', getUser, async (req, res) => {
    const { tipoequipo, locacion, numero, estandar, nombre, estandar_scrap } = req.body;

    const data = {
        numero, nombre, estandar, estandar_scrap, id_tipoequipo: tipoequipo, id_locacion: locacion
    };

        await pool.query('INSERT INTO equipo SET ?', [data])
        .then(function(result){
            if(result.affectedRows > 0){
                return res.redirect('/equipos', 201, req.flash('success', 'Equipo guardado con exito.'));
            }else{
                return res.redirect('/equipos', 400, req.flash('messageError', 'Error al intentar guardar el equipo.'));
            }
        })
        .catch(function(e){
            return res.redirect('/equipos', 500, req.flash('messageError', 'Error en el servidor. Consulta al desarrollador.'));
        });

});

router.get('/disable/:id', async (req, res) => {
    await pool.query('UPDATE equipo SET estado = false WHERE id = ?', [req.params.id])
    .then(function(result){
            if(result.affectedRows > 0){
                return res.redirect('/equipos', 201, req.flash('success', 'El equipo a sido deshabilitado.'));
            }else{
                return res.redirect('/equipos', 400, req.flash('messageError', 'Error al intentar deshabilitar el equipo.'));
            }
        })
        .catch(function(e){
            return res.redirect('/equipos', 500, req.flash('messageError', 'Error en el servidor. Consulta al desarrollador.'));
        });
});

router.get('/enable/:id', async (req, res) => {
    await pool.query('UPDATE equipo SET estado = true WHERE id = ?', [req.params.id])
    .then(function(result){
            if(result.affectedRows > 0){
                return res.redirect('/equipos', 201, req.flash('success', 'El equipo a sido habilitado.'));
            }else{
                return res.redirect('/equipos', 400, req.flash('messageError', 'Error al intentar habilitar el equipo.'));
            }
        })
        .catch(function(e){
            return res.redirect('/equipos', 500, req.flash('messageError', 'Error en el servidor. Consulta al desarrollador.'));
        });
});


router.post('/update/:id', getUser, async (req, res) => {
    const infoUsuario = req.infoUsuario;
    const locacion = infoUsuario[0].id_locacion;

    const { id } = req.params;
    const { tipoequipo, numero, estandar, nombre, estandar_scrap } = req.body;

    const data = {
        numero, nombre, estandar, estandar_scrap, id_tipoequipo: tipoequipo, id_locacion: locacion 
    };

    try{
        const result = await pool.query('UPDATE equipo SET ? WHERE id = ?', [data, id]);
   
        if(result.affectedRows > 0){
            return res.redirect('/equipos', 201, req.flash('success', 'El equipo a sido modificado.'));
        }else{
            return res.redirect('/equipos', 400, req.flash('messageError', 'Error al intentar modificar el equipo.'));
        }
    }catch(e){
        try{
            const secondata = {
                numero, nombre, estandar, estandar_scrap
            };
            const secondresult =  await pool.query('UPDATE equipo SET ? WHERE id = ?', [secondata, id]);
            if(secondresult.affectedRows > 0){
                    return res.redirect('/equipos', 201, req.flash('success', 'El equipo a sido modificado.'));
            }else{
                    return res.redirect('/equipos', 400, req.flash('messageError', 'Error al intentarmodificar el equipo 2.'));
             }

        }catch(err){
            return res.redirect('/equipos', 500, req.flash('messageError', 'Error de servidor. Contacte al desarrollador.'));
        }
    }
});



router.get('/estandar', async (req, res) => {
    const result = await pool.query('SELECT id, estandar FROM equipo')
    res.json({equipos: result});
});

router.get('/scrap', async (req, res) => {
    const result = await pool.query('SELECT id, estandar_scrap FROM equipo')
    res.json({equipos: result});
});

module.exports = router;