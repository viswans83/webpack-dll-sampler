let webpack = require('webpack')
let path = require('path')
let CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    vendorlibs: [ './index.js' ]
  },
  context: __dirname,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    library: '[name]_[chunkhash]'
  },
  plugins: [
    new CleanWebpackPlugin('dist', { verbose: true }),
    new webpack.DllPlugin({
      name: '[name]_[chunkhash]',
      path: path.join(__dirname, 'dist', 'manifest.json'),
    })
  ]
}
