const path = require('path');
// const bootstrap = require('bootstrap');

module.exports = {
  devtool: 'inline-source-map',
  entry: './src/index.js',
  mode: process.env.NODE_ENV,
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

// module: {
//   rules: [
//     {
//       test: /\.css$/,
//       use: [
//         'style-loader',
//         'css-loader'
//       ]
//     }
//   ]
// }