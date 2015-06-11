/*
	mocha test/mocha/Channel.js
*/
var dbURI    = 'mongodb://localhost/testing'
	, chai = require('chai')
  , expect = chai.expect
  , should = chai.should()
	, Q 			 = require('q')
  , mongoose = require('mongoose');

var Channel = require('../../api/models/Channel').model;
var User = require('../../api/models/User').model;
describe('Channel', function() {
	var channel = new Channel();
	var user = new User({
		username: 'Ioioc',
		email: 'hell@ccv.com'
	});
	before(function(done) {
		if (!mongoose.connection.db) {
			mongoose.connect(dbURI);
		}
		user.save(done);
	});
	after(function(done) {
		Channel.remove({}, function(err) {
			if (err){
				return done(err);
			}
			User.remove({}, done);
		});		
	});
	it('user should follow channel once', function() {
		channel.addFollower(user).should.equal(true);
		channel.addFollower(user).should.equal(false);
  });
  it('user should unfollow channel once', function() {
		channel.removeFollower(user).should.equal(true);
		channel.removeFollower(user).should.equal(false);
  });
  it('should create user channel once', function(done) {
  	console.log('create new ch');
  	Channel.createUserChannel('new Channel', user).then(function(channel) {  		
  		return Q.ninvoke(channel, 'save');
  	}).then(function() {
  		return Channel.getUserChannel(user._id);
  	}).then(function(channel) {
  		channel.should.be.an.instanceOf(Object);  		
			Channel.createUserChannel('new Channel', user).then(function() {
				done('should throw');
			}, function() {
				done();
			});
  	}).then(null, done);
  });
});
