module.exports = {
    isAuth,
    isGuest
};

function isAuth() {
    return (req, res, next) => {
        if (req.user) {
            next()
        } else {
            res.redirect('/auth/login');
        }
    }
}

function isGuest() {
    return (req, res, next) => {
        if (!req.user) {
            next()
        } else {
            res.redirect('/cubes');
        }
    }
}