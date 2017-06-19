let webpack = require('webpack')
let path = require('path')
let CleanWebpackPlugin = require('clean-webpack-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')

let vendorlibs = require('../vendor/dist/manifest.json')
let sharedcomponents = require('../shared/dist/manifest.json')

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
      manifest: vendorlibs,
      sourceType: 'var'
    }),
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, '..', 'shared'),
      manifest: sharedcomponents,
      sourceType: 'var'
    }),
    new HtmlWebpackPlugin({
      template: '../template.html'
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      append: false,
      publicPath: false,
      assets: [
        '/shared/' + vendorlibs.name.replace('_', '.') + '.js',
        '/shared/' + sharedcomponents.name.replace('_', '.') + '.js'
      ]
    })
  ],
  devtool: 'source-map'
}
