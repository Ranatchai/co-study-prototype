var webpack = require('webpack');

/**
 * This is the Webpack configuration file for production.
 */
var target = 'cover-mock-main';
for (var i = 0; i < process.argv.length; i++) {
  var value = process.argv[i];
  if (value.indexOf('--target:') >= 0) {
    target = value.slice('--target:'.length);
    break;
  }
}
console.log('target=', target);
module.exports = {
  entry: "./src/" + target,

  output: {
    path: __dirname + "/.tmp/public/app/",
    filename: "app.js"
  },

  module: {
    loaders: [
      { test: /\.async.jsx?$/, exclude: /node_modules/, loaders: ["react-proxy"]},  
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" }
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