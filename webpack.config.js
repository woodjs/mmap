var path = require('path');
var webpack = require('webpack');

module.exports = {

  entry: {
    './lib/es5/mmap': path.join(__dirname, './src/es5/mmap.js'),
    './lib/es6/mmap': path.join(__dirname, './src/es6/mmap.js')
  },

  output: {
    path: path.join(__dirname, ''),
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
