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
        title: 'Inicio',
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
    const tipoequipo = await pool.query('SELECT * FROM vistaequipos WHERE id_locacion = ? GROUP BY id_tipoequipo', [req.user.id_locacion]);
    const limite = await pool.query('SELECT numero FROM equipo WHERE id_locacion =  ? AND estado = true', [req.user.id_locacion]);

    res.render('./index/produccion_leadp', {
        title: 'Producción',
        tipoequipo,
        limite,
        infoUsuario
    });
});


router.get('/produccioncorte', getUser, async (req, res) => {
    const infoUsuario = req.infoUsuario;
    const tipoequipo = await pool.query('SELECT * FROM vistaequipos WHERE id_locacion = ? GROUP BY id_tipoequipo', [req.user.id_locacion]);
    const limite = await pool.query('SELECT numero FROM equipo WHERE id_locacion =  ? AND estado = true', [req.user.id_locacion]);

    res.render('./index/produccion', {
        title: 'Producción',
        tipoequipo,
        limite,
        infoUsuario
    });
});

router.get('/produccionlinea', getUser, async (req, res) => {
    const infoUsuario = req.infoUsuario;
    const tipoequipo = await pool.query('SELECT * FROM vistaequipos WHERE id_locacion = ? GROUP BY id_tipoequipo', [req.user.id_locacion]);
    const limite = await pool.query('SELECT numero FROM equipo WHERE id_locacion =  ? AND estado = true', [req.user.id_locacion]);

    res.render('./index/produccion_linea', {
        title: 'Producción',
        tipoequipo,
        limite,
        infoUsuario
    });
});

router.get('/tablero', getUser, async (req, res) => {
    const infoUsuario = req.infoUsuario;

    res.render('index/tablero', {
        title: 'Tablero',
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
            title: 'Equipos',
            equipo,
            tipoequipo,
            locacion,
            infoUsuario
        });
    }
    else{
      
        res.render('index/equipos', {
            title: 'Equipos',
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
        title: 'Usuarios',
        infoUsuario, usuarios, rol, locacion
    });
});

router.get('/ajustes', getUser, async (req, res) => {

    const infoUsuario = req.infoUsuario;

    res.render('index/ajustes', {
        title: 'Otros',
        infoUsuario
    })
});

module.exports = router;