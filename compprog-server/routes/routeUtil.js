
// contains useful route functionality
module.exports = {
    /**
     * Checks whether the user is logged in, and redirects
     * if this is not the case.
     */
    isLoggedIn: function(req, res, next) {

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated()) {
            return next();
        }

        // set return path for after login
        req.session.returnTo = req.path;

        // if not logged in, redirect to login page
        req.flash('warningMessage', 'Please log in to view this page.');
        res.redirect('/tuelogin'); // TODO: redirect to general login page...
    },

    /**
     * Redirects the user if already logged in.
     */
    redirectIfLoggedIn: function(req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect('/profile');
        }

        return next();
    },

    /**
     * Adds default parameters to be used in rendering a view.
     */
    addDefaultParams: function(req, params) {
        if (!params) {
            params = {};
        }

        // user when logged in
        if (req.isAuthenticated() && req.user) {
            params.user = req.user;
        }

        // flash messages
        params.message = req.flash('message');
        params.warningMessage = req.flash('warningMessage');
        params.errorMessage = req.flash('errorMessage');
        params.successMessage = req.flash('successMessage');

        return params;
    }
};
