const path = require('path');
var HtmlWebpackPlugin =  require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


const config = {
  entry: './site/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'eval',
  module: {
    loaders: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader?outputStyle=expanded'
          ]
        })
			}	
    ]
  },
	plugins: [
		new HtmlWebpackPlugin({
      template: './site/index.html'
    }),
    new ExtractTextPlugin('bundle.css')
	]	
};

module.exports = config;


