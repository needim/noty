/* global __dirname, require, module */
'use strict'

const webpack = require('webpack')
const path = require('path')
const env = require('yargs').argv.env
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractSass = new ExtractTextPlugin({filename: 'noty.css'})
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

let libraryName = 'Noty'
let plugins = []
let outputFile

plugins.push(extractSass)
plugins.push(new webpack.DefinePlugin({
  VERSION: JSON.stringify(require('./package.json').version)
}))

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({minimize: true, sourceMap: true}))
  outputFile = libraryName.toLowerCase() + '.min.js'
} else {
  outputFile = libraryName.toLowerCase() + '.js'
  plugins.push(new BrowserSyncPlugin({
    ui: false,
    host: 'localhost',
    port: 3000,
    server: {
      baseDir: ['./'],
      index: 'demo/index.html'
    }
  }))
}

const config = {
  entry: path.join(__dirname, '/src/index.js'),
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '/lib'),
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        // standard-loader as a preloader
        enforce: 'pre',
        test: /\.js?$/,
        loader: 'standard-loader',
        exclude: /(node_modules|bower_components)/,
        options: {
          error: false,
          snazzy: true,
          parser: 'babel-eslint'
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.scss$/,
        use: extractSass.extract(['css-loader', 'postcss-loader', 'sass-loader']),
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./src'), path.resolve('./node_modules')],
    extensions: ['.js', '.scss']
  },
  plugins: plugins
}

module.exports = config
