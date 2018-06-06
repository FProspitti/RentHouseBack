const  mongoose=require('mongoose');
const  bcrypt = require('bcryptjs');
const  config=require('../config/database');

const  UnidadesSchema = mongoose.Schema({
    descripcion : {
        type: String,
        required: true
    },
    domicilio : {
        type: String,
    },
    provincia : {
        type: String,
    },
    localidad : {
        type: String,
    },
    telefono : {
        type: String,
    },
    ocupante: {
        type: String,
    },
    usuario: {
        type: String,
    },
    tipo: {
        type: String,
    },
    fechaAlta: {
        type: Date,
    },
    baja: {
        type: Boolean,
        default: false
    },
    fechaBaja: {
        type: Date,
    }
});

const  Unidades= module.exports= mongoose.model('unidades', UnidadesSchema) ;

module.exports.getUnidades= function (req, callback) {
    const  query = {baja: false}
    Unidades.find(query,callback);
}