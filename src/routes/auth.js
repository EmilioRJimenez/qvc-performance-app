const express = require('express');
const router = express.Router();
const passport = require('passport');

const pool = require('../database');


router.get('/', (req, res) => {
    res.render('index/auth/signin', {layout: false});
});


router.get('/registro', async (req, res) => {
    const rol = await pool.query('SELECT * FROM roles ORDER BY id DESC'); 
    const locacion = await pool.query('SELECT * FROM locaciones ORDER BY nombre ASC');
    res.render('index/auth/signup', {
        layout: false,
        rol,
        locacion
    });
});


router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
    successRedirect: '/inicio',
    failureRedirect: '/'
    })(req, res, next);
});

router.get('/inicio', (req, res) => {
    res.render('index/inicio');
})

router.post('/save', passport.authenticate('local.signup', {
    successRedirect: '/inicio',
    failureRedirect: '/registro'
}));






module.exports = router;