/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
var sessionAuth = require('./sessionAuth'),
	bearerAuth = require('./bearerAuth');
module.exports = function(req, res, next) {
	if (req.headers.authorization && req.headers.authorization.indexOf('Bearer') >= 0) {
		return bearerAuth(req, res, next);
	} else {
		return sessionAuth(req, res, next);
	}  
};
