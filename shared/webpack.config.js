let webpack = require('webpack')
let path = require('path')
let CleanWebpackPlugin = require('clean-webpack-plugin')

let vendorlibs = require('../vendor/dist/manifest.json')

module.exports = {
  entry: {
    sharedcomponents: [ './index.jsx' ]
  },
  context: __dirname,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    library: '[name]_[chunkhash]'
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
    new webpack.DllPlugin({
      name: '[name]_[chunkhash]',
      path: path.join(__dirname, 'dist', 'manifest.json'),
    })
  ],
  devtool: 'source-map'
}
