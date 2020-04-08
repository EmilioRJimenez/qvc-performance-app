const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/inicio', (req, res) => {
    res.render('index/inicio', {
        title: 'Inicio'
    });
});

router.get('/produccion', async (req, res) => {

    const locacion = await pool.query('SELECT * FROM locaciones WHERE id = ?', [req.user.id_locacion]);
    const tipoequipo = await pool.query('SELECT * FROM vistaequipos WHERE id_locacion = ?', [req.user.id_locacion]);
    const limite = await pool.query('SELECT numero FROM equipo WHERE id_locacion =  ? AND estado = true', [req.user.id_locacion]);
    res.render('./index/produccion', {
        title: 'Producción',
        tipoequipo,
        limite,
        locacion
    });
});

router.get('/tablero', (req, res) => {
    res.render('index/tablero', {
        title: 'Tablero'
    });
});

router.get('/equipos', async (req, res) => {

    const equipo = await pool.query('SELECT * FROM vistaequipos');

    res.render('index/equipos', {
        title: 'Equipos',
        equipo
    });
});

router.get('/usuarios', (req, res) => {
    res.render('index/usuarios', {
        title: 'Usuarios'
    });
});

router.get('/ajustes', (req, res) => {
    res.render('index/ajustes', {
        title: 'Ajustes'
    });
});

module.exports = router;