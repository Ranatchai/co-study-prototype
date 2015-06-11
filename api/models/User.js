var validator = require('validator');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var validator = require('validator');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Passport Model
 *
 * The Passport model handles associating authenticators with users. An authen-
 * ticator can be either local (password) or third-party (provider). A single
 * user can have multiple passports, allowing them to connect and use several
 * third-party strategies in optional conjunction with a password.
 *
 * Since an application will only need to authenticate a user once per session,
 * it makes sense to encapsulate the data specific to the authentication process
 * in a model of its own. This allows us to keep the session itself as light-
 * weight as possible as the application only needs to serialize and deserialize
 * the user, but not the authentication data, to and from the session.
 */
var Passport;
var PassportSchema = Schema({  
  // Required field: Protocol
  //
  // Defines the protocol to use for the passport. When employing the local
  // strategy, the protocol will be set to 'local'. When using a third-party
  // strategy, the protocol will be set to the standard used by the third-
  // party service (e.g. 'oauth', 'oauth2', 'openid').
  protocol: { type: String, required: true, validate: validator.isAlphanumeric },

  // Local fields: Password, Access Token
  //
  // When the local strategy is employed, a password will be used as the
  // means of authentication along with either a username or an email.
  //
  // accessToken is used to authenticate API requests. it is generated when a 
  // passport (with protocol 'local') is created for a user. 
  password    : { type: String },
  accessToken : { type: String },

  // Provider fields: Provider, identifer and tokens
  //
  // "provider" is the name of the third-party auth service in all lowercase
  // (e.g. 'github', 'facebook') whereas "identifier" is a provider-specific
  // key, typically an ID. These two fields are used as the main means of
  // identifying a passport and tying it to a local user.
  //
  // The "tokens" field is a JSON object used in the case of the OAuth stan-
  // dards. When using OAuth 1.0, a `token` as well as a `tokenSecret` will
  // be issued by the provider. In the case of OAuth 2.0, an `accessToken`
  // and a `refreshToken` will be issued.
  provider: { type: String },
  identifier: { type: String },
  tokens: Schema.Types.Mixed
});
/**
 * Callback to be run before updating a Passport.
 *
 * @param {Function} next
 */
PassportSchema.pre('save', function(next) {
  var passport = this;
  if (passport.isModified('password')) {
    bcrypt.hash(passport.password, 10, function (err, hash) {
      passport.password = hash;
      next(err, passport);
    });
  } else {
    next();
  }  
});

/**
 * Validate password used by the local strategy.
 *
 * @param {string}   password The password to validate
 * @param {Function} next
 */
  
PassportSchema.methods.validatePassword = function (password, next) {
  bcrypt.compare(password, this.password, next);
};

var User;
var UserSchema = new Schema({
  username: {
  	type: String,
  	unique: true,
    index: true
  },
  firstname: String,
  lastname: String,
  email: {
  	type: String,
		unique: true,
    index: true,
		validate: [ validator.isEmail, 'invalid email' ]
  },
  permissions: {
    createTopic: {type: Boolean, default: false},
    moderator: {type: Boolean, default: false}, //need?
    admin: {type: Boolean, default: false}
  },
  passports: [PassportSchema]
});
var _ = require('lodash');
UserSchema.methods.toNormalizedForm = function() {
  return _.omit(this.toJSON(), 'passports', 'permissions');
};
UserSchema.methods.findPassport = function(query) {
  return this.passports.filter(function(passport) {    
    for (var key in query) {
      if (passport[key] !== query[key]) {
        return false;
      }
    }
    return true;
  })[0];
};
var virtualFullname = UserSchema.virtual('fullname');
virtualFullname.get = function() {
  return this.firstname + ' ' + this.lastname;
};
virtualFullname.set = function(v) {
  var parts = v.split(' ');
  this.firstname = parts[0];
  this.lastname = parts[1];
};
UserSchema.methods.addPassport = function(passport, cb) {
  var user = this;
  user.passports.push({
    protocol : 'local'
  , password : password
  , user     : user._id
  });
  user.save(cb);
};
UserSchema.methods.removePassport = function(q, cb) {
  var user = this;
  var index = user.passports.indexOf(user.findPassport(q));
  if (index >= 0) {
    user.passports.splice(index, 1);
  }
  return user.save(cb);
};

var User = mongoose.model('User', UserSchema);

exports.model = User;
exports.options = {
  excludeField: ['__v', 'passports']
};