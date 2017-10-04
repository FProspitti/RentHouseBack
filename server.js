/**
 * Created by Fede on 3/10/2017.
 */
var express = require('express');
var mongoose = require('mongoose');

var app= express();

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(3000);