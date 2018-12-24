var express = require('express');
var bcrypt = require('bcryptjs');

var jwt = require( 'jsonwebtoken' );

var authValidate = require('../middleWare/auth');

var app = express();

var Usuario = require ('../models/usuario');

// =============================================
//          OBTENER TODOS LOS USUARIOS
// =============================================
app.get('/', (req, res, next)=>{

    Usuario.find({}, 'nombre email img role')
        .exec(
            (err,usuarios)=>{
                if(err){
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Usuarios',
                        errors: err
                    });
                } else {
                    res.status(200).json({
                        ok:true,
                        usuarios
                    });
                }
            });
    
});


// =============================================
//             CREAR NUEVO USUARIO
// =============================================

app.post('/', authValidate.verificaToken, (req,res)=>{
    
    var body = req.body;
    var passHash  = bcrypt.hashSync( body.password, 10 );
    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: passHash,
        img: body.img,
        role: body.role
    });

    usuario.save( (err, userSaved ) => {
        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear Usuario',
                errors: err
            });
        }

        res.status(201).json({
        ok: true,
        usuario: userSaved,
        userToken: req.usuario
        });
    });

});


// =============================================
//                UPDATE USER
// =============================================

app.put('/:id' , authValidate.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Usuario.findById( id, (err, usuario)=>{
        
        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if ( !usuario ) {
            return res.json({
                ok: false,
                mensaje: 'El usuario con el id ' + id + ' no existe',
                errors: {
                    message:'No existe un usuario con ese id'
                }
            });
        }

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save( (err, userSaved ) => {
            
            if(err){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }
            userSaved.password = ':)';
            res.status(200).json({
                ok: true,
                usuario: userSaved
            });

        });
    });
});

// =============================================
//             DELETE USER BY ID
// =============================================

app.delete('/:id', authValidate.verificaToken, (req, res) => {
    
    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, userRemoved) => {

        if(err) {
            
            return res.status(500).json({
                ok: false,
                mensaje: 'Fatal Error to user deleted',
                errors: err
            });

        }

        if( !userRemoved ){
             return res.status(400).json({
                ok:false,
                mensaje: "Not exist user with this id",
                errors: err
             });
        }

        res.status(200).json({
            ok: true,
            mensaje: userRemoved
        });
    
    });

});
module.exports = app;