/**
 * Created by Fede on 5/10/2017.
 */
const  express=require('express');
const  router=express.Router();
const passport=  require('passport');
const jwt=  require('jsonwebtoken');

const User = require('../models/user');

//Registro
router.post('/register', (req,res, next) => {
    let newUser= new User({
     name: req.body.name,
     email: req.body.email,
     username: req.body.username,
     password: req.body.username,

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
    res.send('authenticate');
});

//Perfil
router.get('/profile', (req,res, next) => {
    res.send('profile');
});




module.exports = router;