const path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  entry: './src/index.js',
  mode: process.env.NODE_ENV,
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
