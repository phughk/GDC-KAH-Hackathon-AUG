/* eslint-disable */

var path = require('path')
var webpack = require('webpack')
var webpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config')

var port = process.env.PORT || 3000

config.watch = true
config.entry = [
  'react-hot-loader/patch',
  'webpack-dev-server/client?http://localhost:' + port,
  'webpack/hot/only-dev-server'
].concat(config.entry)

var compiler = webpack(config)
var server = new webpackDevServer(compiler, {
  publicPath: config.output.publicPath,
  contentBase: 'www/',

  hot: true,
  historyApiFallback: true,
  noInfo: false,
  quiet: false,
  stats: {
    version: true,
    timings: true,
    modules: false,
    errorDetails: true,
    chunkModules: false,
    colors: true
  }
})

server.listen(port, 'localhost', function (err) {
  if (err) {
    throw err
  }

  console.log('☕️  Listening at http://localhost:' + port)
});

