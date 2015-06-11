var webpack = require('webpack');

/**
 * This is the Webpack configuration file for production.
 */
module.exports = {
  entry: "./src/main",

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