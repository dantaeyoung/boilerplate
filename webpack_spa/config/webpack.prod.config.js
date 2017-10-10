const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpackCommon = require('./webpack.common.config');

const srcDir = webpackCommon.srcDir;
const distDir = webpackCommon.distDir;

module.exports =  {

  // Where to fine the source code
  context: srcDir,
	entry: webpackCommon.entry,
	resolve: webpackCommon.resolve,

  // No source map for production build
  devtool: 'hidden-source-map',

  output: {
    // The destination file name concatenated with hash (generated whenever you change your code).
    // The hash is really useful to let the browser knows when it should get a new bundle or use the one in cache
    filename: 'main-[hash].js',

    // The destination folder where to put the output bundle
    path: distDir,

    // Wherever resource (css, js, img) you call <script src="..."></script>,
    // or css, or img use this path as the root
    publicPath: '/',

    // At some point you'll have to debug your code, that's why I'm giving you
    // for free a source map file to make your life easier
    // sourceMapFilename: 'main-[hash].map',
  },

  // The devServer config is here to enable you to run the production build. I know you wanna see
  // the output of this awesome config with me (Webpack 2).
  devServer: {
    contentBase: distDir,
    historyApiFallback: true,
    port: 3000,
    compress: true,
    inline: false
  },

  module: {
    rules: [
      {
        // Webpack, when walking down the tree, whenever you see `.js` file use babel to transpile
        // the code to ES5. I don't want you to look into the node_modules folder.
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        // It's production mode and I don't want inline CSS so put all my CSS into a file
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: ['css-loader', 'sass-loader']
        }),
      },
      {
        test: /\.(jpg|jpeg|png|gif|ico|svg)$/,
        loader: 'url-loader',
        query: {
          // if less, bundle the asset inline, if greater, copy it to the dist/assets folder using file-loader
          limit: 10000,

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
    new webpack.NamedModulesPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),

    new HtmlWebpackPlugin({
      // where to find the html template
      template: path.join(srcDir, 'index.html'),

      // where to put the generated file
      path: distDir,

      // the output file name
      filename: 'index.html'
    }),

    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    }),

    // Put all css code in this file
    new ExtractTextPlugin('app-[hash].css'),
  ],

};
