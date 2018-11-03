// Requires
var express = require('express');
var mongoose = require('mongoose');

// Inicializar variables
var app = express();

// Conexión con la BBDD

mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err , res) =>{
if( err ){
    throw err;
}else{
    console.log('Base de datos: \x1b[32m%s\x1b[0m ' , 'Conectado a la BBDD');
}
});

// Rutas
app.get('/', (req, res, next)=>{
    res.status(200).json({
        ok: true,
        mensaje: 'Petición realizada correctamente'
    });
});
// Escuchar peticiones
app.listen(3000, () => {
    console.log('Express Server, Puerto 3000: \x1b[32m%s\x1b[0m',' Online');
});