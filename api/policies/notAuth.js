/**
 * notAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow only non-authenticated user

 *
 */
module.exports = function(req, res, next) {
  if (!req.session.authenticated) {
    return next();
  }
  res.redirect('/');

};
