const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackCommon = require('./webpack.common.config');

const srcDir = webpackCommon.srcDir;
const distDir = webpackCommon.distDir;



module.exports = {

  context: srcDir,
	entry: webpackCommon.entry,
	resolve: webpackCommon.resolve,

  devtool: 'source-map',


  output: {
    filename: 'main.bundle.js',
    path: distDir,
    publicPath: '/',
    sourceMapFilename: 'main.map',
  },

  devServer: {
    contentBase: srcDir,
    // match the output path
    publicPath: '/',
    // match the output `publicPath`
		hot: true,
		inline: true,
    historyApiFallback: true,
    port: 3000 
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
					{
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true,
              sourceMapContents: true
            }
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif|ico|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 10000, // use data url for assets <= 10KB
          name: 'assets/[name].[hash].[ext]'
        },
      },
			{
				test: /\.(json)$/, 
				loader: 'file-loader',
				query: {
					name: 'assets/[name].[ext]'
				}
			}
    ]
  },

  plugins: [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),

    new HtmlWebpackPlugin({
      template: path.join(srcDir, 'index.html'),
      // where to find the html template

      path: distDir,
      // where to put the generated file

      filename: 'index.html'
      // the output file name
    }),
  ],

};

