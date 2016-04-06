var path = require('path');
var webpack = require('webpack');

module.exports = {

  entry: {
    mmap: path.join(__dirname, './src/es6/mmap.js')
  },

  output: {
    path: path.join(__dirname, './lib/es6'),
    filename: '[name].js'
  },

  module: {
    loaders: [
      {test: /.{1,}\.js$/, loader: 'babel'}
    ]
  },

  plugins: [

  ]
};
