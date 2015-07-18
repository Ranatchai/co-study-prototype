var webpack = require('webpack');

/**
 * This is the Webpack configuration file for local development. It contains
 * local-specific configuration such as the React Hot Loader, as well as:
 *
 * - The entry point of the application
 * - Where the output file should be
 * - Which loaders to use on what files to properly transpile the source
 *
 * For more information, see: http://webpack.github.io/docs/configuration.html
 */
var config = require('./app.config');
var target = process.env.target || 'cover';
for (var i = 0; i < process.argv.length; i++) {
  var value = process.argv[i];
  if (value.indexOf('--target:') >= 0) {
    target = value.slice('--target:'.length);
    break;
  }
}
var main_path = config[target].path;
module.exports = {

  // Efficiently evaluate modules with source maps
  devtool: "eval",

  // Set entry point to ./src/main and include necessary files for hot load
  entry:  [
    "webpack-dev-server/client?http://localhost:9091",
    "webpack/hot/only-dev-server",
    // "./src/main",
    // "./src/mockup-main2",
    main_path
    // "./src/eateeni-mock-main"
    // "./src/mockup-polygon-main"
    // "./src/timeline/app"
  ],

  // This will not actually create a bundle.js file in ./build. It is used
  // by the dev server for dynamic hot loading.
  output: {
    path: __dirname + "/.tmp/public/app/",
    filename: "app.js",
    publicPath: "http://localhost:9091/app/"
  },

  // Necessary plugins for hot load
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  // Transform source code using Babel and React Hot Loader
  module: {
    loaders: [
      { test: /\.async.jsx?$/, exclude: /node_modules/, loaders: ["react-proxy"]},
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ["react-hot", "jsx-loader?harmony"]}
    ]
  },

  // Automatically transform files with these extensions
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}