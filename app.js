// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Inicializar variables
var app = express();

// Body Parser
// parse aplication/x-www/form/urlencoded
app.use(bodyParser.urlencoded({ extend: false}));
app.use(bodyParser.json());

// Importar Rutas
var appRoute = require('./routes/app');
var usuarioRoute = require('./routes/usuario');
var loginRoute = require('./routes/login');

// Conexión con la BBDD
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err , res) =>{
if( err ){
    throw err;
}else{
    console.log('Base de datos: \x1b[32m%s\x1b[0m ' , 'Conectado a la BBDD');
}
});


// Rutas
app.use('/usuario', usuarioRoute);
app.use('/' , appRoute);
app.use('/login', loginRoute);

// Escuchar peticiones
app.listen(3000, () => {
    console.log('Express Server, Puerto 3000: \x1b[32m%s\x1b[0m',' Online');
});