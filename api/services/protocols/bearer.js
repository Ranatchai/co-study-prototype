/*
 * Bearer Authentication Protocol
 *
 * Bearer Authentication is for authorizing API requests. Once
 * a user is created, a token is also generated for that user
 * in its passport. This token can be used to authenticate
 * API requests.
 *
 */

exports.authorize = function(token, done) {
  db.User.findOne({ 'passports.accessToken': token }, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    return done(null, user, { scope: 'all' });
  }); 
};
