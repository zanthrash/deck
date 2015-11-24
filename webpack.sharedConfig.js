var path = require('path');

module.exports = {
  nodeModulesPath: path.join(__dirname, 'node_modules'),
  bowerComponentsPath: path.join(__dirname, 'bower_modules'),
  sharedDefinitions: {
    "__NETFLIX_ENABLED__": process.env.NETFLIX_ENABLED || true,
    "__CLOUDFOUNDRY_ENABLED__": process.env.CLOUDFOUNDRY_ENABLED || true,
    "__GOOGLE_ENABLED__": process.env.GOOGLE_ENABLED || true,
    "__AMAZON_ENABLED__": process.env.AMAZON_ENABLED || true,
    "__TITAN_ENABLED__": process.env.TITAN_ENABLED || true,
  },
  sharedAliases: {
    'core': path.join(__dirname, 'app', 'scripts', 'modules', 'core'),
    'config': path.join(__dirname, 'deployable', 'config'),
  },
  //debug: true,
  //devtool: 'eval',
  module: {
    loaders: [
      {
        test: /jquery\.js$/,
        loader: 'expose?jQuery',
      },
      {
        test: /\.css$/,
        loader: 'style!css',
      },
      {
        test: /\.js$/,
        loader: 'ng-annotate!angular!babel!envify!eslint',
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        loader: 'style!css!less',
      },
      {
        test: /\.(woff|otf|ttf|eot|svg|png|gif|ico)(.*)?$/,
        loader: 'file',
      },
      {
        test: /\.html$/,
        loader: 'ngtemplate?relativeTo=' + (path.resolve(__dirname))  + '/!html'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ],
  },
  devServer: {
    port: process.env.DECK_PORT || 9000,
    host: process.env.DECK_HOST || 'localhost'
  }
};
