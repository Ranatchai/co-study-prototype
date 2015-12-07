var webpack = require('webpack');

/**
 * This is the Webpack configuration file for production.
 */
var config = require('./app.config');
var target = process.env.target || 'little-builder';
for (var i = 0; i < process.argv.length; i++) {
  var value = process.argv[i];
  if (value.indexOf('--target:') >= 0) {
    target = value.slice('--target:'.length);
    break;
  }
}
var main_path = config[target].path;
console.log('target=', target, main_path);
module.exports = {
  entry: main_path,

  output: {
    path: __dirname + "/.tmp/public/app/",
    filename: "app.js"
  },

  module: {
    loaders: [
      { test: /\.async.jsx?$/, exclude: /node_modules/, loaders: ["react-proxy"]},  
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "jsx-loader?harmony" }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ]
}