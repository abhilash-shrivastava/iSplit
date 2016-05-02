var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
  entry: [
    './client/js/app.js',
    'webpack-dev-server/client?http://localhost:9000', // WebpackDevServer host and port
    'webpack/hot/only-dev-server'
  ],
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
        loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=react']
      }
    ]
  }
};
module.exports = config;
