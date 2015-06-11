var validator = require('validator');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');
var Channel;

var ChannelSchema = new Schema({ // http://gmlive.com, https://medium.com/backchannel
	name: String,
	tagline: String,
  slug: {type: String, require: true},
  items: [{type: Schema.Types.ObjectId, ref: 'Item'}],

  coverAsset: {type: Schema.Types.Mixed, ref: 'Asset'},
	coverAssetId: {type: Schema.Types.ObjectId, ref: 'Asset'},
	
  avatarAsset: {type: Schema.Types.Mixed, ref: 'Asset'},
	avatarAssetId: {type: Schema.Types.ObjectId, ref: 'Asset'},

  siteId: {type: Schema.Types.ObjectId},
  site: {type: Schema.Types.Mixed},
  followers: [{
  	_id: {type: Schema.Types.ObjectId, index: true},
  	username: String,
  	email: String,
  	fistname: String,
  	lastname: String
  }],

  members: [{
  	_id: {type: Schema.Types.ObjectId, index: true},
  	role: String,
  	username: String,
  	email: String,
  	fistname: String,
  	lastname: String
  }],
  type: String // author channel, brand channel, mcn channel
});
ChannelSchema.index({siteId: 1, slug: 1});
ChannelSchema.plugin(mongoose.denormalizer, [
	{key: 'coverAssetId', to: 'coverAsset'},
	{key: 'avatarAssetId', to: 'avatarAsset'}
]);

ChannelSchema.methods.toNormalizedForm = function() {
  return this.toJSON();
};
var _ = require('lodash');
ChannelSchema.statics.createUserChannel = function(channelName, user, attr) {
	return Channel.getUserChannel(user._id).then(function(channel) {
		if (channel) {			
			throw new Error('Cannot create channel');
		}
		var u = user.toNormalizedForm();
		u.role = 'admin';
		return Channel.create(_.extend({
			name: channelName,
			slug: encodeURIComponent(channelName)			
		}, attr, {
			members: [u],
			type: 'user'
		}));
	});
};
ChannelSchema.methods.addFollower = function(user) {
	var channel = this;
	var found = false;
	for (var i = 0; i < channel.followers.length; i++) {
		if (channel.followers[i]._id.toString() === user._id.toString()) {
			found = true;
			break;
		}
	}
	if (found) {
		return false;
	}
	channel.followers.push(user.toNormalizedForm());
	return true;
};
ChannelSchema.methods.removeFollower = function(user) {
	var channel = this;
	channel.followers.pull({
		_id: user._id.toString()
	})	
	return true;
};
ChannelSchema.statics.getUserChannel = function(userId) {
	return Channel.findOne({type: 'user', 'members._id': userId}).exec();
};

Channel = mongoose.model('Channel', ChannelSchema);
exports.model = Channel;
exports.options = {
	allow_direct_update: ['name', 'tagline', 'coverAssetId', 'avatarAssetId']
};
