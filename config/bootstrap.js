/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */
var Q = require('q');
module.exports.bootstrap = function(cb) {    
  Q.longStackSupport = true;
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)  
  if (!process.env.PRODUCTION) {
    var webpack = require('webpack');
    var WebpackDevServer = require('webpack-dev-server');
    var config = require('../webpack.local.config');

    new WebpackDevServer(webpack(config), {
      publicPath: config.output.publicPath,
      hot: true,
      quiet: false,
      noInfo: true,
      historyApiFallback: true,
      proxy: {
        "*": "http://localhost:1337"
      }
    }).listen(9090, 'localhost', function (err, result) {
      if (err) {
        console.log(err);
      }
      cb();
    });
    setTimeout(function() {
      console.log('use port 9090');
    }, 1000);
  }
};
