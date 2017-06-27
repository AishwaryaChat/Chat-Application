const path = require('path')
const fs = require('fs')

var nodeModules = {}
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })

module.exports = {
  entry: [path.join(__dirname, 'app.js')],
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js'
  },
  target: 'node',
  resolve: {
    modules: [
      __dirname,
      'node_modules'
    ],
    extensions: ['.webpack.js', '.web.js', '*', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {presets: ['react', 'es2015', 'stage-0']},
        test: '/\.(js|jsx)?$/',
        exclude: '/node_modules/'
      },
      {
        test: '/\.css$/',
        use: ['style-loader', 'css-loader']
      },
      {
        test: '/(jpe?g|png|gif|svg)$/i',
        loaders: ['file-loader?hash=sha512&digest=hex&name=[hash].[ext]']
      },
      { test: '/aws\-sdk/', loaders: ['transform?brfs']},
      { test: '/\.json$/', loader: 'json-loader'}
    ]
  },
  externals: nodeModules
}
