'use strict';

var HtmlWebpackPlugin = require('html-webpack-plugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var path = require('path');
var webpack = require('webpack');
var sharedConfig = require(
  path.join(__dirname, '..', 'webpack.sharedConfig.js')
);
var definitions = sharedConfig.sharedDefinitions;

var alias = sharedConfig.sharedAliases;

module.exports = {
  debug: sharedConfig.debug,
  devtool: sharedConfig.devtool,
  entry: {
    app: path.join(__dirname, 'index.js'),
  },
  output: {
    path: path.join(__dirname, 'build', 'webpack', process.env.SPINNAKER_ENV || ''),
    filename: '[name].js',

  },
  externals: [{
    'angular': {
      root: 'angular',
      amd: 'angular',
      commonjs2: 'angular',
      commonjs: 'angular',
    },
    'jquery': {
      root: 'jquery',
      amd: 'jquery',
      commonjs2: 'jquery',
      commonjs: 'jquery',
    }
  }],
  module: sharedConfig.module,
  resolve: {
    root: [
      sharedConfig.nodeModulesPath,
      sharedConfig.bowerComponentsPath,
    ],
    alias: alias,
  },
  resolveLoader: {
    root: sharedConfig.nodeModulesPath,
  },
  plugins: [
    new CommonsChunkPlugin(
      /* filename= */'init.js'
    ),
    new webpack.DefinePlugin(definitions),
  ],
  devServer: {
    port: process.env.DECK_PORT || 9000,
    host: process.env.DECK_HOST || 'localhost'
  }
};
