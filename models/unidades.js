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

module.exports.addUnidades= function (newUnidad, callback) {
    newUnidad.descripcion = 'Dto';
    newUnidad.domicilio='Araoz';
    newUnidad.save(callback);

}


module.exports.deleteUnidad= function (id, res) {
    Unidades.findById(id, function(error, unidad){
        if(error){
            callback(null,'Error al intentar modificar el usuario.');
        }else{
            var unidad = unidad;
            unidad.fechaBaja = hoy;
            unidad.baja=true;
            unidad.save(res);
        }
    });
}

module.exports.updateUnidad= function (unidad1, res) {
    Unidades.findById(unidad1._id, function(error, unidad){
        if(error){
            callback(null,'Error al intentar modificar el usuario.');
        }else{
            var unidad = unidad;
            // usuario.baja=user1.baja;
            // usuario.name=user1.name;
            // usuario.username=user1.username;
            // usuario.email=user1.email;
            // usuario.password=user1.password;
            unidad.save(res);
        }
    });
}


