var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    path.join(__dirname, './src/index'),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    },{
      test: /\.css$/,
      loaders: [ 'style', 'css' ],
      include: path.join(__dirname, 'src')
    },
    {
      test: /\.json$/,
      loader: 'json'
    }
  ]},
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  }
};
