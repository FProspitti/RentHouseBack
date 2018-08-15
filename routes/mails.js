/**
 * Created by Fede on 5/10/2017.
 */
var express = require('express');
const  router=express.Router();
const nodemailer = require('nodemailer');

router.get('/sendMail', function (req, res, next) {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'federico1236@gmail.com',
            pass: '1085785710268'
        },
        tls:{
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    const mailOptions = {
        from: 'federico1236@gmail.com', // sender address
        to: 'federico_123_6@hotmail.com', // list of receivers
        subject: 'Sabroso', // Subject line
        html: '<p>Loco turbina</p>'// plain text body
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
            console.log(err)
        else
            console.log(info);
    });
});
module.exports = router;