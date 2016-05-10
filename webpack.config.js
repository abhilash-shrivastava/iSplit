var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');

var config = {
  entry: [
    './client/root.jsx',
    'webpack-dev-server/client?http://0.0.0.0:9000', // WebpackDevServer host and port
    'webpack/hot/only-dev-server'
  ],
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, './client/dist'),
    filename: "js/bundle-[hash].min.js"
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
    }),
    // new ExtractTextPlugin('./css/bundle-[hash].min.css'),
    new CleanWebpackPlugin(['dist'], {
      root: path.join(__dirname, './client'),
      verbose: true,
      dry: false
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=react']
      }, {
        test: /\.css$/,
        loader: "style-loader!css-loader"
        // loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      }
    ]
  }
};
module.exports = config;
