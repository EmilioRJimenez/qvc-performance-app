const express = require('express');
const router = express.Router();

const pool = require('../database');


router.post('/locacion', async (req, res) => {
    
});

router.get('/disable/:id', async (req, res) => {
    const id = req.params.id;
    await pool.query('UPDATE locaciones SET estado = false WHERE id = ?', [id])
    .then(function(result){
            if(result.affectedRows > 0){
                return res.redirect('/ajustes', 201, req.flash('success', 'El área a sido deshabilitada.'));
            }else{
                return res.redirect('/ajustes', 400, req.flash('messageError', 'Error al intentar deshabilitar el área.'));
            }
        })
        .catch(function(e){
            return res.redirect('/ajustes', 500, req.flash('messageError', 'Error en el servidor. Consulta al desarrollador.'));
        });
});

router.get('/enable/:id', async (req, res) => {
    const id = req.params.id;
    await pool.query('UPDATE locaciones SET estado = true WHERE id = ?', [id])
    .then(function(result){
            if(result.affectedRows > 0){
                return res.redirect('/ajustes', 201, req.flash('success', 'El área a sido habilitada.'));
            }else{
                return res.redirect('/ajustes', 400, req.flash('messageError', 'Error al intentar habilitar el área.'));
            }
        })
        .catch(function(e){
            return res.redirect('/ajustes', 500, req.flash('messageError', 'Error en el servidor. Consulta al desarrollador.'));
        });
});


router.get('/disablemodel/:id', async (req, res) => {
    const id = req.params.id;
    await pool.query('UPDATE tipo_equipo SET estado = false WHERE id = ?', [id])
    .then(function(result){
            if(result.affectedRows > 0){
                return res.redirect('/ajustes', 201, req.flash('success', 'El modelo a sido deshabilitada.'));
            }else{
                return res.redirect('/ajustes', 400, req.flash('messageError', 'Error al intentar deshabilitar el modelo.'));
            }
        })
        .catch(function(e){
            return res.redirect('/ajustes', 500, req.flash('messageError', 'Error en el servidor. Consulta al desarrollador.'));
        });
});

router.get('/enablemodel/:id', async (req, res) => {
    const id = req.params.id;
    await pool.query('UPDATE tipo_equipo SET estado = true WHERE id = ?', [id])
    .then(function(result){
            if(result.affectedRows > 0){
                return res.redirect('/ajustes', 201, req.flash('success', 'El modelo a sido habilitada.'));
            }else{
                return res.redirect('/ajustes', 400, req.flash('messageError', 'Error al intentar habilitar el modelo.'));
            }
        })
        .catch(function(e){
            return res.redirect('/ajustes', 500, req.flash('messageError', 'Error en el servidor. Consulta al desarrollador.'));
        });
});


router.post('/model', async (req, res) => {
    const { nombre } = req.body;
    const data = { nombre };
    await pool.query('INSERT INTO tipo_equipo SET ?', [data])
    .then(function(result){
        if(result.affectedRows > 0){
            res.redirect('/ajustes', 200, req.flash('success', 'Los datos fuerón guardados con exito.'))
        }else {
            res.redirect('/ajuste', 400, req.flash('messageError', 'Error al guardar los datos. Vuelve a intentarlo.'))
        }
    })
    .catch(function(err){
        res.redirect('/ajustes', 500, req.flash('messageError', 'Error en el servidor. Consulta al desarrollador.'));
    });
});

router.post('/location', async (req, res) => {
    const { nombre, nombre_real } = req.body;
    const data = { nombre, nombre_real };
    await pool.query('INSERT INTO locaciones SET ?', [data])
    .then(function(result){
        if(result.affectedRows > 0){
            res.redirect('/ajustes', 200, req.flash('success', 'Los datos fuerón guardados con exito.'))
        }else {
            res.redirect('/ajuste', 400, req.flash('messageError', 'Error al guardar los datos. Vuelve a intentarlo.'))
        }
    })
    .catch(function(err){
        res.redirect('/ajustes', 500, req.flash('messageError', 'Error en el servidor. Consulta al desarrollador.'));
    });
});



module.exports = router;