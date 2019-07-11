const express = require('express');
const passport = require('../config/passport');
var model = require('../models/useDAO');

const app = express.Router();

app.get('/', function (req, res) {
    res.render('index.ejs');
});

app.get('/login', function (req, res) {
    res.render('login.ejs');
});

app.get('/', function (req, res) {
    res.render('food.ejs');
});

app.get('/', function (req, res) {
    res.render('introduce.ejs');
});

app.get('/', function (req, res) {
    res.render('plus.ejs');
});
app.get('/', function (req, res) {
    res.render('TouristSpot.ejs');
});

app.post('/login', function(req, res){
    console.log('req.body : ', req.body);
    if(req.body.name && req.body.pw){
        console.log('데이터베이스 접근');    
        model.getUserData(req.body.name, function(data){
            
            console.log('data : ', data[0]);
            console.log('data : ', data[0].username);
            if(data.password === req.body.pw )
            {
                res.render('../views/start.ejs');
            }else{
                res.render('../views/login.ejs');
            }
        });
    }
});

// app.post('/login', function(req, res){
//     passport.authenticate('local-login', {
//         successRedirect: '/profile',
//         failureRedirect: '/login',
//         failureFlash: true
//     });
// });

// app.post('/login', passport.authenticate('local-login', {
//     successRedirect: '/profile',
//     failureRedirect: '/login',
//     failureFlash: true
// }),
//     function (req, res) {
//         if (req.body.remember) {
//             req.session.cookie.maxAge = 1000 * 60 * 3;
//         } else {
//             req.session.cookie.expires = false;
//         }
//         res.redirect('/');
//     });

app.get('/signup', function (req, res) {
    res.render('signup.ejs');
});

app.post('/signup', function (req, res) {
    console.log('req.body: ', req.body);
    if(req.body.name && req.body.pw){
        console.log('데이터베이스 접근'); 
        model.setUserData(req.body, function(){
            res.redirect('/');
        });
    //  model.setUserData(req.body.name, function(data){
    //         if(data.username === req.body.name  )
    //         {
    //             res.render('../views/signup.ejs');
    //             console.log('다시입력해요');
    //         }else{
    //             res.render('../views/login.ejs');
    //         }
    //     }
    }
});

app.get('/start', isLoggedIn, function (req, res) {
    res.render('start.ejs', {
        user: req.user
    });
});

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
})


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}

module.exports = app;