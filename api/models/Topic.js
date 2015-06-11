var validator = require('validator');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Topic;

var TopicSchema = new Schema({
	title: { type: String, required: true },
	text: { type: String, required: true },
	userId: { type: Schema.Types.ObjectId, required: true, ref: 'User'},
	user: { type: Schema.Types.Mixed }, // user denomalizeFrom
	tags: [String],
	condition: {
		limit: {type: Number, default: 0}
	},
	favorites: [{
		userId: Schema.Types.ObjectId,
		timestamp: {type: Date, default: Date.now}
	}],
	slug: {type: String, unique: true, index: true}
});
TopicSchema.plugin(mongoose.denormalizer, [
	{key: 'userId', to: 'user'}
]);

Topic = mongoose.model('Topic', TopicSchema);

exports.model = Topic;
exports.options = {
	create: function(req, res, next) {
		var attr = req.body;
		attr.userId = req.user._id;
		Topic.create(attr).then(function(r) {
			res.json(r);
		}).then(null, next);
	}
};