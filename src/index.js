const express = require('express');
const morgan = require('morgan');
const hbs = require('express-handlebars');
const path = require('path');

//Inicializaciones
const app = express();

//Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', hbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Variables globales
app.use((req, res, next) => {

    next();
});

//Rutas
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

//Archivos publicos
app.use(express.static(path.join(__dirname, 'public')));

//Inicializando el servidor
app.listen(app.get('port'), () => {
console.log(`Server on port ${app.get('port')}`);
});