var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
  entry: "./client/js/app.js",
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, './client/dist'),
    filename: "js/bundle-[hash].js"
  },
  devServer: {
    port: 9000,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
      inject: 'body',
      filename: 'index.html'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
module.exports = config;
