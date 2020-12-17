const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  devtool: 'inline-source-map',
  entry: './src/index.js',
  mode: process.env.NODE_ENV,
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },


  plugins: [new HtmlWebpackPlugin({
      title: 'webpack',
      template: path.resolve(__dirname, './src/index.html'), // template file      
      filename: 'index.html', // output file    
    }),
    new CleanWebpackPlugin(),
    // new MiniCssExtractPlugin(),
  ],

  module: {
    rules: [
      // images
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img'
          },
        }, ],
      },
      //css
      {
        test: /\.css$/,
        use: [
          // MiniCssExtractPlugin.loader, 
          'style-loader',
          'css-loader'],
      },
    ]
  }

};