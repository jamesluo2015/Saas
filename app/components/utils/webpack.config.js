ar webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: {
    '/home/index': './app/js/home/index.js',
    '/product/addprodbysuit': './app/js/product/addprodbysuit.js',
    '/product/addprodbyno': './app/js/product/addprodbyno.js',
    '/product/list': './app/js/product/list.js',
    '/account/index': './app/js/account/index.js',
    '/account/license': './app/js/account/license.js',
    '/account/reset': './app/js/account/reset.js',
    '/config/brand': './app/js/config/brand.js',
    '/config/express': './app/js/config/express.js',
    '/config/stock': './app/js/config/stock.js',
    '/manage/bm': './app/js/manage/bm.js',
    '/order/list': './app/js/order/list.js',
    '/order/returned': './app/js/order/returned.js',
    '/stock/house': './app/js/stock/house.js',
    '/stock/slot': './app/js/stock/slot.js',
    '/stock/main': './app/js/stock/main.js',
    '/stock/outstock': './app/js/stock/outstock.js',
    '/finance/current': './app/js/finance/current.js',
    '/finance/past': './app/js/finance/past.js',
  },
  output: {
    path: './build',
    publicPath: '/build/',
    filename: '[name].js'
  },
  resolve: {
    root: path.resolve('./'),
    extensions: ['', '.js', '.vue'],
    alias: {
       'vue-strap': path.resolve(__dirname, './node_modules/vue-strap/dist/vue-strap')
    }
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
        exclude: /node_modules|vue-strap|vue|vue-loader/,
        loader: 'babel-loader',
        query: { presets: ['es2015'] }
      },
      { test: /\.css$/, loader: "style-loader!css-loader?root=./docs/" },
      { test: /\.eot/, loader: 'file?prefix=font/' },
      { test: /\.woff/, loader: 'file?prefix=font/&limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf/, loader: 'file?prefix=font/' },
      { test: /\.svg/, loader: 'file?prefix=font/' },
      { test: /\.scss$/, loader: "style-loader!css-loader!sass-loader" },
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
    ],

  },
  babel: {
    presets: ['es2015'],
    plugins: ["transform-runtime"]
  },
  devtool: 'source-map'

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
    //new webpack.optimize.CommonsChunkPlugin("init.js")
  ];
}
