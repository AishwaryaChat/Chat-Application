const path = require('path')

module.exports = {
  entry: ['public/app/main.js'],
  output: {
    path: path.join(__dirname, '/public/build'),
    filename: 'bundle.js'
  },
  resolve: {
    modules: [
      __dirname,
      'node_modules'
    ],
    alias: {
      Home: path.resolve('public/app/components/home.js')
    },
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]'
        ]
      }
    ]
  }
}
