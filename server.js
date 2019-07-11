var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();
var port = process.env.PORT || 8080;
var path = require('path');

var passport = require('passport');
var flash = require('connect-flash');

require('./config/passport')(passport);
var router = require('./app/routes');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use("/css", express.static(path.join(__dirname, '/css')));
app.use("/js", express.static(path.join(__dirname, '/js')));


app.use(session({
    secret: 'justasecret',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', router);

app.listen(port);
console.log("Port: " + port);