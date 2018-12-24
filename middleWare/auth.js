var jwt = require( 'jsonwebtoken' );
var SEED = require('../config/config').SEED;

// =============================================
//         VERIFICAR TOKEN / MIDDLEWARE
// =============================================
exports.verificaToken = (req, res, next) =>{
    var token = req.query.token;
    jwt.verify( 
        token , 
        SEED, 
        (err, decode) => {
            if(err){
                return res.status(401).json({
                    ok:false,
                    mensaje: 'Incorrect Token',
                    errors: err
                });
            } 

            req.usuario = decode.usuario;

            next();
        }
    );
};


 

