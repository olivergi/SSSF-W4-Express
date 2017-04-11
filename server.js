'use strict';
const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const moment = require('moment');
const useragent = require('express-useragent');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

app.use(cookieParser());
app.use(useragent.express());

// set a cookie
app.use(function (req, res, next) {
    // check if client sent cookie
    let cookie = req.cookies.cookieName;
    if (cookie === undefined)
    {
        // no: set a new cookie
        let randomNumber = Math.random().toString();
        randomNumber = randomNumber.substring(2,randomNumber.length);
        res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
        console.log('cookie created successfully');
    }
    else
    {
        // yes, cookie was already present
        console.log('cookie exists', cookie);
    }
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

app.use(require('./routes'));

function logErrors (err, req, res, next) {
    console.error(err.stack);
    next(err);
}

function clientErrorHandler (err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' })
    } else {
        next(err)
    }
}

function errorHandler (err, req, res, next) {
    res.status(500);
    res.render('error', { error: err });
}


let dummyUsers = [
    {name: 'Oliver'},
    {name: 'Potato'},
    {name: 'Merlin'}
];

const findUserByName = (username) => {
    for (let i in dummyUsers) {
        if (username == dummyUsers[i].name){
            return dummyUsers[i];
        }
    }
};

app.route('/user/:asd')
    .get(function (req, res, next) {
        res.send('Get User ' + findUserByName(req.params.asd));
        next();
    })
    .post(function (req, res, next) {
        dummyUsers.add({name: req.params.asd});
        res.send('Add a user');
        next();
    })
    .put(function (req, res, next) {
        res.send('Update the User');
        findUserByName(req.paras.asd).name == 'New Username';
        next();
    });

// let static middleware do its job
app.use(express.static('/'));

app.get('/*', (req, res) => {
    const param1 = req.path;
    const queryparams = req.query;
    console.log('Cookies: ', req.cookies);

    // User agent contains information on the browser being used.
    console.log(req.useragent);
    res.send('Got to the root with path: '+param1+' with query params: '+
        JSON.stringify(queryparams) + " - Time: " + moment().format() + " User-Agent: " + JSON.stringify(req.useragent));
});

console.log('inspector started');
app.listen(8080);