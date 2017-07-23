var webpack = require('webpack');
// var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    // path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [{
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'jsx-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react']
        }
      },{
        test: /\.less$/,
        loaders: ['style-loader', 'css-loader', 'less-loader']
      },{
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    // new CommonsChunkPlugin('init.js'),
    // new OpenBrowserPlugin({
    //  url: 'http://localhost:8080'
    // })
  ],
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    proxy: {
      '/data/asset/data/npmdepgraph.min10.json': {
        target: 'http://114.212.189.147:10038',
        changeOrigin: false
      },
      '/ssss': {
        target: 'http://114.212.189.147:10038',
        changeOrigin: true,
        pathRewrite: {'^/ssss' : ''}

      },
      '/v2/apps/*': {
        target: 'http://marathon.njuics.cn',
        changeOrigin: true
      },
      '/api/v4/projects/*': {
        target: 'https://git.njuics.cn',
        changeOrigin: true
      },
      '/metric/nap/*': {
        target: 'http://114.212.189.147:10011',
        changeOrigin: true
      },
      '/nodes': {
        target: 'http://114.212.189.147:10011',
        changeOrigin: true
      },
      '/tasks': {
        target: 'http://114.212.189.147:10011',
        changeOrigin: true
      },
      '/services': {
        target: 'http://114.212.189.147:10011',
        changeOrigin: true
      }
    }
  }
};