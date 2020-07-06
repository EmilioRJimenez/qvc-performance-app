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

router.get('/inicio', getUser, (req, res) => {
    const infoUsuario = req.infoUsuario;
    
    res.render('index/inicio', {
        infoUsuario
    });
});

router.get('/produccion', (req, res) => {

    console.log(req.user);
    if(req.user.id_locacion === 2){
        res.redirect('/produccioncorte');
    }else if(req.user.id_locacion === 3){
        res.redirect('./produccionleadp');
    }else{
        res.redirect('/produccionlinea');
    }  
       
});

router.get('/produccionleadp', getUser, async (req, res) => {
    const infoUsuario = req.infoUsuario;
    const tipoequipo = await pool.query('SELECT * FROM vistaequipos WHERE id_locacion = ? AND estado = 1 ORDER BY nombre', [req.user.id_locacion]);
    res.render('./index/produccion_leadp', {
        tipoequipo,
        infoUsuario
    });
});


router.get('/produccioncorte', getUser, async (req, res) => {
    const infoUsuario = req.infoUsuario;
    const tipoequipo = await pool.query('SELECT * FROM vistaequipos WHERE id_locacion = ? AND estado = 1 ORDER BY nombre', [req.user.id_locacion]);
    res.render('./index/produccion', {
        tipoequipo,
        infoUsuario
    });
});

router.get('/produccionlinea', getUser, async (req, res) => {
    const infoUsuario = req.infoUsuario;
    const tipoequipo = await pool.query('SELECT * FROM vistaequipos WHERE id_locacion = ? AND estado = 1 ORDER BY nombre', [req.user.id_locacion]);
    
    res.render('./index/produccion_linea', {
        tipoequipo,
        infoUsuario
    });
});

router.get('/tablero', getUser, async (req, res) => {
    const infoUsuario = req.infoUsuario;

    res.render('index/tablero', {
        title: 'Dashboard',
        infoUsuario
    });
});

router.get('/equipos', getUser, async (req, res) => {
    const infoUsuario = req.infoUsuario;
    const loc = infoUsuario[0].id_locacion;
    const equipo = await pool.query('SELECT * FROM vistaequipos WHERE id_locacion = ?', [loc]);
    const tipoequipo = await pool.query('SELECT * FROM tipo_equipo');
    if(infoUsuario[0].rol === 'Administrador'){
        const locacion = await pool.query('SELECT * FROM locaciones');
        res.render('index/equipos', {
            equipo,
            tipoequipo,
            locacion,
            infoUsuario
        });
    }
    else{
      
        res.render('index/equipos', {
            equipo,
            tipoequipo,
            infoUsuario
        });
    }

    
});

router.get('/usuarios', getUser, async (req, res) => {
    const infoUsuario = req.infoUsuario;
    const usuarios = await pool.query('SELECT * FROM vistausuarios');
    const rol = await pool.query('SELECT * FROM roles ORDER BY id DESC'); 
    const locacion = await pool.query('SELECT * FROM locaciones ORDER BY nombre ASC');

    res.render('index/usuarios', {
        infoUsuario, usuarios, rol, locacion
    });
});

router.get('/ajustes', getUser, async (req, res) => {

    const infoUsuario = req.infoUsuario;
    const locaciones = await pool.query('SELECT * FROM locaciones');
    const tipoequipo = await pool.query('SELECT * FROM tipo_equipo');

    res.render('index/ajustes', {
        infoUsuario,
        locaciones,
        tipoequipo
    });
});

module.exports = router;