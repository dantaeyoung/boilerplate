const path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin =  require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
  entry: './site/main.js',
    output: {
    path: __dirname + '/dist', //where it puts build files
    publicPath: '/', // where it links to within the code
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    hot: true
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader?outputStyle=expanded'
          ]
        })
            }    ,
      { test: /\.(png|jpg|svg|json)$/, loader: 'file-loader?name=[name].[ext]' }

    ]
  },
    plugins: [
        new HtmlWebpackPlugin({
      template: './site/index.html'
    }),
    new ExtractTextPlugin('bundle.css'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
    ]    
};

module.exports = config;

