var validator = require('validator');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');
var Item;

var ItemSchema = new Schema({
	title: {type: String, required: true},
	text: {type: String},
	asset: {type: Schema.Types.Mixed, ref: 'Asset'},
	assetId: {type: Schema.Types.ObjectId, ref: 'Asset'},
	url: {type: String},
	tags: [{type: String}],
	favorites: [{
		userId: Schema.Types.ObjectId,
		timestamp: {type: Date, default: Date.now}
	}],
	userId: { type: Schema.Types.ObjectId, required: true, ref: 'User'},
	user: { type: Schema.Types.Mixed }, // user denomalizeFrom
	// which channel does this item belong to
  channelId: { type: Schema.Types.ObjectId, ref: 'Channel'},
  channel: { type: Schema.Types.Mixed }, // channel denomalizeFrom

  publishedDate: {type: Date}

});
ItemSchema.plugin(mongoose.denormalizer, [
	{key: 'assetId', to: 'asset'},
	{key: 'channelId', to: 'channel'},
	{key: 'userId', to: 'user'}
]);
Item = mongoose.model('Item', ItemSchema);
exports.model = Item;
exports.options = {
	create: function(req, res, next) {
		var attr = req.body;
		attr.userId = req.user._id;
		Item.create(attr).then(function(r) {
			res.json(r);
		}, next);
	}
}