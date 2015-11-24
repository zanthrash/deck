'use strict';

var HtmlWebpackPlugin = require('html-webpack-plugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var path = require('path');
var sharedConfig = require(
  path.join(__dirname, '..', 'webpack.sharedConfig.js')
);
var webpack = require('webpack');
var definitions = sharedConfig.sharedDefinitions;

definitions.__DEFAULT_TIME_ZONE__ = process.env.TIME_ZONE || "'America/Los_Angeles'";
definitions.__GATE_HOST__ = process.env.GATE_HOST || "'spinnaker-api-prestaging.prod.netflix.net'";
definitions.__WHATS_NEW_GIST_ID__ = process.env.WHATS_NEW_GIST_ID|| "'32526cd608db3d811b38'";
definitions.__WHATS_NEW_FILE_NAME__ = process.env.WHATS_NEW_FILE_NAME || "'news.md'";
definitions.__WHATS_NEW_ACCESS_TOKEN__ = process.env.WHATS_NEW_ACCESS_TOKEN || "''";

var alias = sharedConfig.sharedAliases;
alias['src'] = path.join(__dirname, '..', 'app', 'scripts');

module.exports = {
  debug: sharedConfig.debug,
  devtool: sharedConfig.devtool,
  entry: path.join(__dirname, 'index.js'),
  output: {
    path: path.join(__dirname, 'build', 'webpack', process.env.SPINNAKER_ENV || ''),
    filename: '[name].js',
  },
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
    new HtmlWebpackPlugin({
      title: 'Spinnaker',
      template: path.join(__dirname, 'index.html'),
      favicon: path.join(__dirname, 'favicon.ico'),
      inject: true,
    }),
    new webpack.DefinePlugin(definitions),
  ],
  devServer: {
    port: process.env.DECK_PORT || 9000,
    host: process.env.DECK_HOST || 'localhost'
  }
};
