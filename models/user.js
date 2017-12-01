/**
 * Created by Fede on 5/10/2017.
 */
const  mongoose=require('mongoose');
const  bcrypt = require('bcryptjs');
const  config=require('../config/database');
const  hoy=new Date();

const  UserSchema = mongoose.Schema({
   name : {
       type: String,
   },
    email : {
        type: String,
        required: true
    },
    username : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String,
    },
    baja: {
        type: Boolean,
        default: false
    },
    fechaBaja: {
        type: Date,
    }
});

const  User= module.exports= mongoose.model('user', UserSchema) ;

module.exports.getUserById= function (id, callback) {
    User.findById(id,callback);
}

module.exports.getUserByUserName= function (username, callback) {
    const  query = {username: username}
    User.findOne(query,callback);
}

module.exports.addUser= function (newUser, callback) {
    bcrypt.genSalt(8, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) throw err;
    newUser.password = hash;
    newUser.save(callback);
    });
    });
}
module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function(err, res) {
        if (err) { throw (err); }
        callback(null,res);

    });
}

module.exports.getUsers= function (req, callback) {
    const  query = {baja: false}
    User.find(query,callback);
}

module.exports.deteleUser= function (id, callback) {
    User.findByIdAndRemove(id,callback);
}

module.exports.deleteUser= function (id, res) {
    User.findById(id, function(error, user){
        if(error){
            callback(null,'Error al intentar modificar el usuario.');
        }else{
            var usuario = user;
            usuario.fechaBaja = hoy;
            usuario.baja=true;
            usuario.save(res);
        }
    });
}

module.exports.updateUser= function (user1, res) {
    User.findById(user1._id, function(error, user){
        if(error){
            callback(null,'Error al intentar modificar el usuario.');
        }else{
            var usuario = user;
            usuario.baja=user1.baja;
            usuario.name=user1.name;
            usuario.username=user1.username;
            usuario.email=user1.email;
            usuario.password=user1.password;
            usuario.save(res);
    }
    });
}


