var Firebase = require('firebase');

var firebase = new Firebase('https://incandescent-torch-3160.firebaseio.com/');
var users = firebase.child('users');

var crypto = require('crypto');

function hash(password) {
    return crypto.createHash('sha512').update(password).digest('hex');
}


var router = require('express').Router();

var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(require('cookie-parser')());
router.use(require('express-session')({
    resave: false,
    saveUninitialized: true,
    secret: 'todayisthursday'
}));

router.post('/api/signup', function(req, res) {
    var username = req.body.username,
        password = req.body.password;

    if (!username || !password) {
        return res.json({
            signedIn: false,
            massage: 'no username or password'
        });
    }

    users.child(username).once('value', function(snapshot) {
        if (snapshot.exists()) {
            return res.json({
                signedIn: false,
                message: 'username already in use'
            });
        }

        var user = {
            username: username,
            passwordHash: hash(password)
        };

        users.child(username).set(user);
        req.session.user = user;

        res.json({
            signedIn: true,
            user: user
        });
    });
});

router.post('/api/signin', function(req, res) {
    var username = req.body.username,
        password = req.body.password;

    if (!username || !password) {
        return res.json({
            signedIn: false,
            massage: 'no username or password'
        });
    }

    users.child(username).once('value', function(snapshot) {
        if (!snapshot.exists() || snapshot.child('passwordHash').val() !== hash(password)) {
            return res.json({
                signedIn: false,
                message: 'wrong username or password'
            });
        }

        var user = snapshot.exportVal();

        req.session.user = user;
        res.json({
            signedIn: true,
            user: user
        });
    });
});

router.post('/api/signout', function(req, res) {
    delete req.session.user;
    res.json({
        signedIn: false,
        message: 'you have been signed out'
    });
});

module.exports = router;
