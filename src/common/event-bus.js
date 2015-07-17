var Backbone = require('backbone');
var _ = require('underscore');
var eventBus = _.extend({}, Backbone.Events);;
module.exports = eventBus;