const passport = require('passport');
const localStrategy = require('passport-local');

const mylib = require('../lib/mylib');

const pool = require('../database');

passport.use('local.signin', new localStrategy({
    usernameField: 'usuario',
    passwordField: 'password',
    passReqToCallback: true
},async (req, usuario, password, done) => {
        const rows = await pool.query('SELECT * FROM usuarios WHERE email = ?', [usuario]);
        if(rows.length > 0){
            const user = rows[0];
            const validaPassword = await mylib.matchPassword(password, user.password);
            if(validaPassword){
                const estado = await pool.query('SELECT * FROM usuarios WHERE email = ? AND estado = true', [[usuario]]);
                if(estado.length > 0){
                    done(null, user);
                }else{
                    req.flash('messageError', 'Usuario deshabilitado');
                    done(null, false);
                }
                
            }else{
                req.flash('messageError', 'Usuario o contraseña incorrectos');
                done(null, false);
            }
        }else{
            req.flash('messageError', 'Usuario o contraseña incorrectos');
            done(null, false);
        }
}));

passport.use('local.signup', new localStrategy({
    usernameField: 'usuario',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, usuario, password, done) => {
    const { email, telefono, rol, locacion, turno } = req.body;

    const newUser = {
        usuario, email, telefono, password, id_rol: rol, id_locacion: locacion, turno
    };

    newUser.password = await mylib.encryptPassword(password);
    const result = await pool.query('INSERT INTO usuarios SET ?', [newUser]);
    if(result.affectedRows > 0){
        req.flash('success', 'Usuario guardado');
        done(null);
    }else{
        req.flash('messageError', 'Error al guardar al usuario');
        done(null, false);
    }
    
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (user, done) => {
    const newuser = await pool.query('SELECT * FROM usuarios WHERE id = ?', [user.id]);
    return done(null, newuser[0]);
});