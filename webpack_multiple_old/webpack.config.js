const webpack = require('webpack');
var path = require('path');
var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';


module.exports = {
  context: __dirname,
  // Include the hot middleware with each entry point
  entry: {
		app1_bundle: ['./subapps/app1/main.js', hotMiddlewareScript],
		app2_bundle: ['./subapps/app2/main.js', hotMiddlewareScript]
	},
  output: {
    path: __dirname,
    publicPath: '/',
    filename: '[name].js'
  },
  devtool: 'eval',
//  devtool: 'source-map', //for production?
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.sass$/,
        loaders: [
          'style',
          'css',
          'sass?outputStyle=expanded'
        ]
      },
      {
        test: /\.json$/,
        loaders: ['json']
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.sass'],
    modulesDirectories: ['node_modules'],
    alias: {
      '~' : __dirname
    }
  },
  devServer: {
    historyApiFallback: true
  },
	plugins: [
		 new webpack.optimize.OccurenceOrderPlugin(),
		 new webpack.HotModuleReplacementPlugin(),
		 new webpack.NoErrorsPlugin(),
	]

};
