/**
 * Created by Fede on 5/10/2017.
 */
const  express=require('express');
const  router=express.Router();
const passport=  require('passport');
const jwt=  require('jsonwebtoken');
const config= require('../config/database');
const User = require('../models/user');
const dia = new Date();


//Registro
router.post('/register', (req,res, next) => {
    let newUser= new User({
     name: req.body.name,
     email: req.body.email,
     username: req.body.username,
     password: req.body.password,
});

User.addUser(newUser, (err,user) =>{
    if(err){
        res.json({success: false, msg: 'Failed register'});
    }else{
        res.json({success: true, msg: 'User register'});
    }
});
});

//Autenticacion
router.post('/authenticate', (req,res, next) => {
    const username= req.body.username;
    const password= req.body.password;

User.getUserByUserName(username, (err,user) =>{
    if(err) throw err;
if(!user){
    return res.json({success : false, msg: 'Usuario no encontrado'});
}

User.comparePassword(password, user.password, (err, isMatch) => {
    if(err) throw err;
if(isMatch){
    const token = jwt.sign({user: user} , config.secret, {
        expiresIn: 604800 //una semana
    });

    res.json({
        success: true,
        token: 'JWT '+token,
        user:{
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
        }
    });

    console.log(res);
}else{
    return res.json({sucess: false, msg: 'Password Incorrecto'})
}
});
});
});

//Perfil
router.get('/profile', passport.authenticate('jwt', {session: false}), (req,res, next) => {
   res.json({user: req.user});
});

router.get('/users', passport.authenticate('jwt', {session: false}), function(req, res) {
    User.getUsers(req, function(err,user1) {
        res.send(user1);

})
});

router.post('/deleteUser', passport.authenticate('jwt', {session: false}), function(req, res) {
    const id= req.body._id;
    User.deteleUser(id, function(err,user1) {
        res.send(user1);

    })
});

router.put('/deleteUser', passport.authenticate('jwt', {session: false}), function(req, res) {
    User.deleteUser(req.body._id, function(err,user1) {
        if(err){
            res.json({success: false, msg: 'Error actualizar'});
        }else{
            res.json({success: true, msg: 'Usuario modificado'});
        }
   })
});

router.put('/updateUser', passport.authenticate('jwt', {session: false}), function(req, res) {
    User.updateUser(req.body, function(err,user1) {
        if(err){
            res.json({success: false, msg: 'Error actualizar'});
        }else{
            res.json({success: true, msg: 'Usuario modificado'});
        }
    })
});

module.exports = router;