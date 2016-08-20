/*eslint-disable */
var webpack = require('webpack')
var path = require('path')

var PRODUCTION = process.env.NODE_ENV === 'production'

if (!PRODUCTION) {
  require('dotenv').config()
}

var replace = {};
for (var key in process.env) {
  if (process.env.hasOwnProperty(key)) {
    replace["process.env." + key] = '"' + process.env[key] + '"';
  }
}

var plugins = [ new webpack.DefinePlugin(replace) ]

var productionPlugins = [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
]

var developmentPlugins = [
  new webpack.HotModuleReplacementPlugin()
]

var loaders = [{
  test: /\.jsx?$/,
  loader: 'babel-loader',
  include: path.join(__dirname, 'src'),
  exclude: /node_modules/
}, {
  test: /\.css$/,
  loaders: [ 'style', 'raw' ],
  include: path.join(__dirname, 'src')
}]

module.exports = {
  cache: !PRODUCTION,
  resolve: {
    extensions: [ '', '.js' ]
  },
  eslint: {
    configFile: path.join(__dirname, '.eslintrc'),
    emitError: true,
    emitWarning: true,
    failOnWarning: false,
    failOnError: false
  },
  entry: [ './src/index' ],
  devtool: 'source-map',
  plugins: plugins
    .concat(PRODUCTION ? productionPlugins : developmentPlugins),
  module: {
    loaders: !PRODUCTION ? loaders : loaders.concat({
      test: /\.jsx?$/,
      loader: 'eslint-loader',
      include: path.join(__dirname, 'src/scripts')
    })
  },
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'bundle.js',
    publicPath: '/'
  }
}

