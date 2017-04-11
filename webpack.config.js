/* global __dirname, require, module */
'use strict';

const webpack = require('webpack');
const path = require('path');
const env = require('yargs').argv.env;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({filename: 'noty.css'});
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

let libraryName = 'Noty';
let plugins = [], outputFile;

plugins.push(extractSass);

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({minimize: true, sourceMap: true}));
  outputFile = libraryName.toLowerCase() + '.min.js';
} else {
  outputFile = libraryName.toLowerCase() + '.js';
}

const config = {
  entry  : __dirname + '/src/index.js',
  devtool: 'source-map',
  output : {
    path          : __dirname + '/lib',
    filename      : outputFile,
    library       : libraryName,
    libraryTarget : 'umd',
    umdNamedDefine: true
  },
  module : {
    rules: [
      {
        test   : /\.js$/,
        loader : 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test   : /\.js$/,
        loader : 'eslint-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.scss$/,
        use : extractSass.extract(['css-loader', 'postcss-loader', 'sass-loader']),
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  resolve: {
    modules   : [path.resolve('./src')],
    extensions: ['.js', '.scss']
  },
  plugins: plugins
};

module.exports = config;