var shell = require('shelljs');
var _ = require('lodash');
var AppConfig = require('../../app.config');
var active = 'cover';
for (var i = 0; i < process.argv.length; i++) {
  var value = process.argv[i];
  if (value.indexOf('--target:') >= 0) {
    active = value.slice('--target:'.length);
    break;
  }
}
module.exports = {	
	index: function(req, res, next) {
		console.log('index');
    // serverRender(req, res, next);		
		res.view('app', {
			html: '',
			errors: req.flash('error')
    });
	},
	appList: function(req, res, next) {		
		var list = Object.keys(AppConfig).map(function(key) {
			return _.extend({key: key}, AppConfig[key]);
		});

		res.view('app-list', {
			list: list,
			errors: req.flash('error'),
			active: active
		});
	},
	generateAPP: function(req, res, next) {
		var target = req.body.target;
		if (!target || !AppConfig[target]) {
			return next();
		}
		active = target;
		var child = shell.exec('grunt webpack:dev --target:' + target, {silent: true, async: true}, function(err, out) {
			if (err) {
				return next(err);
			}
			res.redirect('/app');
		});
		// child.stdout.on('data', function(data) {
		// 	if (!!data) {
		// 		console.log(data);
		// 	}
		// });
	}
};