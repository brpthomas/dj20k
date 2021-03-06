const User = require('../models/user');
const router = require('express').Router();
const passport = require('passport');
const auth = require('../services/auth');
const stocks = require('../models/stocks');

// ----------------------------------------
// users index
// users sign-up

router.post(
    '/',
    // we want the behavior of the site to vary depending on whether or
    // not the user is already logged in. If they are logged in, we want
    // to send them to /users/profile. If they are not, we want to send
    // them to users/new.
    passport.authenticate(
        // The following string indicates the particular strategy instance
        // we'll want to use to handle signup. We defined behavior for
        // 'local-signup' back in index.js.
        'local-signup', {
            failureRedirect: '/users/new',
            successRedirect: '/users/profile'
        }
    )
);

// ----------------------------------------
// register new user

router.get('/new', (req, res) => {
    res.render('users/register');
});

// ----------------------------------------
// user logout

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// ----------------------------------------
// user login

router.get('/login', (req, res) => {
    res.render('users/login');
});

//checks if the password is correct at the login page

router.post('/login', passport.authenticate(
    'local-login', {
        failureRedirect: '/users/login',
        successRedirect: '/users/profile'
    }
));

// ----------------------------------------
// user profile

router.get(
    '/profile',
    // Middleware (that we wrote) ensuring that if the user is not
    // authenticated, he or she will be redirected to the login screen.
    auth.restrict,
    (req, res) => {
        // console.log('in handler for users/profile');
        // console.log('req.user:');
        // console.log(req.user);
        let userData = {}
        User
            .findByEmail(req.user.email)
            .then(user => {
                userData.user = user
                return User.showStock(req.user.id)
            })
            .then(savedStock => {
                userData.savedStock = savedStock
                console.log("hey from savedstock",userData.savedStock);
                res.render('users/profile', {userData });
            })
            .catch(err => console.log('ERROR:', err));
    }
);


module.exports = router;
