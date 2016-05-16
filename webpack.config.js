var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: {
    addprodbyname: './app/js/addprodbyname.js',
    addprodbyno: './app/js/addprodbyno.js'
  },
  output: {
    path: './build',
    publicPath: '/build/',
    filename: '[name].js'
  },
  resolve: {
    root: path.resolve('./')
  },
  devServer: {
    hot: true,
    inline: true,
    contentBase: path.resolve(__dirname, 'build')
  },
  module: {
    loaders: [
      { test: /\.vue$/, loader: 'vue' },
      {
        test: /\.js$/,
        exclude: /node_modules|vue\/src|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
        loader: 'babel-loader'
      },
      { test: /\.css$/, loader: "style-loader!css-loader?root=./docs/" },
      { test: /\.eot/, loader: 'file?prefix=font/' },
      { test: /\.woff/, loader: 'file?prefix=font/&limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf/, loader: 'file?prefix=font/' },
      { test: /\.svg/, loader: 'file?prefix=font/' },
      { test: /\.scss$/, loader: "style!css!sass" },
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
    ]
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  //devtool: 'cheap-module-source-map'//source-map'
};


if (process.env.NODE_ENV === 'production') {
  delete module.exports.devtool;
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin("init.js")
  ];
}
