/**
 * Created by Fede on 06/06/2018.
 */
const  express=require('express');
const  router=express.Router();
const passport=  require('passport');
const jwt=  require('jsonwebtoken');
const config= require('../config/database');
const Unidad = require('../models/unidades');



router.get('/unidades', passport.authenticate('jwt', {session: false}), function(req, res) {
    Unidad.getUnidades(req, function(err,unidad1) {
        res.send(unidad1);

})
});

router.post('/nuevaUnidad', (req,res, next) => {
    let newUnidad= new Unidad({
        descripcion: 'Dtos',
    });

Unidad.addUnidades(newUnidad, (err,user) =>{
    if(err){
        res.json({success: false, msg: 'Error al crear unidad'});
    }else{
        res.json({success: true, msg: 'Unidad creada'});
}
});
});


module.exports = router;