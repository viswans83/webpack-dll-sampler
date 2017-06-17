let webpack = require('webpack')
let path = require('path')
let CleanWebpackPlugin = require('clean-webpack-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')

let sharedlibsManifest = require('../shared/dist/manifest.json')

module.exports = {
  entry: {
    app1: './index.jsx'
  },
  context: __dirname,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    publicPath: '/app1/'
  },
  resolve: {
    extensions: [ '.js', '.jsx' ]
  },
  module: {
    rules: [
      { test: /\.jsx?$/, use: 'babel-loader' }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist', { verbose: true }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: sharedlibsManifest,
      sourceType: 'var'
    }),
    new HtmlWebpackPlugin({
      template: '../template.html'
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      append: false,
      publicPath: false,
      assets: [ '/shared/' + sharedlibsManifest.name.replace('_', '.') + '.js' ]
    })
  ],
  devtool: 'source-map'
}
