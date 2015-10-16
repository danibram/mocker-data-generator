var webpack = require('webpack')
var path = require('path')
var fs = require('fs')

var plugins = [
  new webpack.IgnorePlugin(/\.(css|less)$/),
  new webpack.BannerPlugin('require("source-map-support").install();', { raw: true, entryOnly: false })
]

if (process.env.COMPRESS) {
    plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        compressor: {
            warnings: false
        }
    })
  )
}

var nodeModules = {}
fs.readdirSync('node_modules')
  .filter(function(x) {
      return ['.bin'].indexOf(x) === -1
  })
  .forEach(function(mod) {
      nodeModules[mod] = 'commonjs ' + mod
  })

module.exports = {
    module: {
        preLoaders: [
          { test: /\.(js|jsx)$/, loaders: ['jscs'], exclude: /node_modules/ }
        ],
        loaders: [
          { test: /\.(js|jsx)$/, loaders: ['babel?stage=0'], exclude: /node_modules/ },
          { test: /\.ts(x?)$/, loaders: ['ts-loader'], exclude: /node_modules/ },
          { test: /\.json$/, loader: 'json-loader' }
        ],
        noParse: []
    },
    externals: nodeModules,
    plugins: plugins,
    devtool: process.env.COMPRESS ? null : 'inline-source-map',
    ts: {
        compiler: 'typescript'
    }
}
