var webpack = require('webpack');
// var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
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
      },
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
        target: 'http://echarts.baidu.com',
        changeOrigin: true
      },
      '/api/v4/projects/419/repository/commits': {
        target: 'https://git.njuics.cn',
        changeOrigin: true
      }
    }
  }
};
