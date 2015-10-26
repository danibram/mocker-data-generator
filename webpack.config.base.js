var webpack = require('webpack')
var path = require('path')
var fs = require('fs')

var plugins = []

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
          { test: /\.js$/, loaders: ['jscs'], exclude: /node_modules/ }
        ],
        loaders: [
          { test: /\.js$/, loaders: ['babel?stage=0'], exclude: /node_modules/ },
          { test: /\.ts$/, loaders: ['ts-loader'], exclude: /node_modules/ }
        ],
        noParse: []
    },
    externals: nodeModules,
    plugins: plugins,
    ts: {
        compiler: 'typescript'
    }
}
