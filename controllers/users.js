const User = require('../models/user');

module.exports.register = (req, res) => {
    res.render('users/register');
};

module.exports.createUser = async (req, res) => {
    try{
        const {email, username, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if(err) return next(err);
            req.flash('success', `Welcome to YelpCamp ${username}.`);
            res.redirect('/campgrounds');
        });
        
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('register');
    }
};

module.exports.loginForm = (req, res) => { 
    res.render('users/login');
};

module.exports.loginUser = (req, res) => {
    req.flash('success', 'Welcome');
    const redirectURL = res.locals.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectURL);
};

module.exports.logoutUser = (req, res, next) => {
    req.logOut(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye');
        res.redirect('/campgrounds');
    });
};