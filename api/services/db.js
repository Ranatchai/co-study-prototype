 /**
 * We load mongoose
 */
var mongoose = require('mongoose');
var redis = require('redis');
var fs = require('fs');
var path = require('path');
var Q = require('q');
exports.loadDatabase = function(cb) {
	var cf = sails.config;
	var mongoClient = mongoose.connection;
	mongoose.connect(cf.connections.mongoDB);
	mongoose.denormalizer = function(schema, list) {
		schema.pre('save', function (next) {
			var model = this;
	    var promises = list.map(function(obj) {
	    	var key = obj.key;
	    	var to = obj.to;
	    	if (model.isModified(key)) {
	    		if (!model[key]) {
	    			model[key] = null;
	    			model[to] = null;
	    			return;
	    		}
	    		var dModel = mongoose.model(schema.path(key).options.ref);
	    		return dModel.findById(model[key]).exec().then(function(dmodel) {
	    			model[to] = dmodel.toNormalizedForm? dmodel.toNormalizedForm(): dmodel.toJSON();
	    		});
	    	}
	    });
	    Q.all(promises).then(function() {
	    	next();
	    }, next);
	  });
	};
	
	var redisConfig = cf.connections.redisDB;	
	var redisClient = redis.createClient(redisConfig.port, redisConfig.host, redisConfig.options);
	/**
	 * We check if the connection is ok
	 * If so we will continue to load everything ...
	 */
	 
	console.log('Try to connect to MongoDB via Mongoose ...');
	 
	mongoClient.on('error', console.error.bind(console, 'Mongoose connection error:'));
	mongoClient.once('open', function() { 
	  console.log('Connected to MongoDB !');
	  var models = {};
		var modelsPath = __dirname + '/../models';
		fs.readdirSync(modelsPath).forEach(function(fileName) {
			if (fileName.search(/\.bak|\.disabled|^\.|response_package|app/) > -1) {
	      return;
	    }
	    if (fileName.search(/\.js/) < 0) { // folder
	    	return;
	    } else {
	    	var r = require(modelsPath + '/' + fileName);
	    	var model = r.model;
	    	var options = _.extend({}, r.options);
	    	var modelName = path.basename(fileName, '.js');	    	
	    	models[modelName] = model;
	    	generateController(model, modelName, options);
	    }		
		});
		cb(models, {mongo: mongoClient, redis: redisClient});
	});
}


function generateController(Model, modelName, options) {
	if (options.api === false) {
		return;
	}
	var defaultSelect = options.excludeField? options.excludeField.map(function(s) {
		return '-' + s;
	}).join(' '): '';

	function parseQuery(query) {
  	return _.omit(query, ['limit', 'skip', 'sort', 'select']);
  };
  function parseSelect(query) {  	
  	var arr = query.select? 
  		Array.isArray(query.select)? 
	  		query.select
	  		: [query.select]
	  		: [];

	  if (options.excludeField) {
		  arr = arr.filter(function(s) {
		  	return s && options.excludeField.indexOf(s) < 0;
		  });
	  }
	  return arr.length > 0? arr.join(' '): defaultSelect;
  };
  function parseSort(query) {
  	return query.sort;
  };
  function parseLimit(query) {
  	var DEFAULT_LIMIT = 30;
  	return +query.limit || DEFAULT_LIMIT;
  };
  function parseSkip(query) {
  	return +query.skip || 0;
  };

	var methods = {
		create: function(req, res, next) {
			Model.create(req.body, function(err, r) {
				if (err) {
					next(err) 
				} else {
					res.json(r);
				}
			});
		},
		read: function(req, res, next) {
			var query = req.query;			
			Model.find()
				.where( parseQuery(query) )
			  .limit( parseLimit(query) )
			  .skip( parseSkip(query) )
			  .select( parseSelect(query) )
			  .sort( parseSort(query) )
			  .exec()
			  .then(function(r) {
					res.json(r);
				}, next);
		},
		readOne: function(req, res, next) {
			var query = req.query;
			Model.findOne({_id: req.params.id})
				.where( parseQuery(query) )
				.select( parseSelect(query) )
			  .exec()
			  .then(function(r) {
					res.json(r);
				}, next);
		},
		update: function(req, res, next) {
			/*
				pass new = true cause it return the modified document rather than the original
			*/
			if (options.allow_direct_update === false) {
				return next();
			}
			Model.findById(req.params.id)
				.exec()
				.then(function(model) {
					Object.keys(req.body).forEach(function(key) {
						model[key] = req.body[key];
					});
					return Q.ninvoke(model, 'save')
				}).then(function(model) {
					res.json(model[0]);
				}, next);
		},
		remove: function(req, res, next) {
			Model.remove({_id: req.params.id})
				.exec()
				.then(function() {
					res.json({});
				}, next);
		},
	};
	sails.get('/api/' + modelName, options.read || methods.read);
	sails.post('/api/' + modelName, options.create || methods.create);
	sails.get('/api/' + modelName + '/:id', options.readOne || methods.readOne);
	sails.put('/api/' + modelName + '/:id', options.update || methods.update);
	sails.del('/api/' + modelName + '/:id', options.remove || methods.remove);
};