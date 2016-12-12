// app/routes.js
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/status', function(req, res) {
        res.json({
            message: 'you made it'
        });
    });

    // process the login form
    app.post('/login',
        function(req, res, next) {
            passport.authenticate('local-login', function(err, user, info) {
                if (err) {
                    return res.status(err.code).send(err.message);
                }

                if (user) {
                    req.logIn(user, function (err) {
                        if (err) {
                            return res.send({
                                'status': 'err', 'message': err.message
                            });
                        }
                        return res.send({
                            'status': 'ok'
                        });
                    });
                }
            })(req, res, next);
        }, function(err) {
            console.log(err);
        });

    app.post('/signup',
        function(req, res, next) {
            passport.authenticate('local-signup', function(err, user, info) {
                if (err) {
                    return res.status(err.code).send(err.message);
                }

                if (user) {
                    req.logIn(user, function (err) {
                        if (err) {
                            return res.send({
                                'status': 'err', 'message': err.message
                            });
                        }
                        return res.send({
                            'status': 'ok'
                        });
                    });
                }
            })(req, res, next);
        }, function(err) {
            console.log(err);
        });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}