const path = require('path');
const webpack = require('webpack');
const uglifyPlugin = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// 采用多进程打包构建
const HappyPack = require('happypack');

const config = require('../config');
const utils = require('./utils');
const debug = require('debug')('app:config:base');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

debug('创建webpack base配置');

module.exports = {
  entry: {
    app: './src/main.js',
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath
      : (process.env.NODE_ENV === 'test' ? config.test.assetsPublicPath : config.dev.assetsPublicPath),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      // src: resolve('src'),
    },
  },
  module: {
    rules: [
      {
        test:/\.(jsx|js)$/,
        exclude:/node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
          loader:'url-loader',
          options:{
            limit: 10000,
            name: utils.assetsPath('images/[name].[hash:7].[ext]'),
          }
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
          },
        }],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          'style-loader',
          'css-loader',
          'fast-sass-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.css$/,
        use:[
          'style-loader',
          'css-loader',
          'postcss-loader'
        ],
      },
      // 配置在html img 引入图片的打包问题
      {
        test: /\.(htm|html)$/i,
        use:[ 'html-withimg-loader']
      },
    ],
  },
  plugins: [
    // new HappyPack({
    //   id: 'jsx',
    //   threads: 6,
    //   loaders: [{
    //     loader: 'babel-loader',
    //     options: {
    //       cacheDirectory: true
    //     }
    //   }]
    // }),
    // new HappyPack({
    //   id: 'css',
    //   threads: 4,
    //   loaders: [{
    //     loader: 'css-loader',
    //     options: {
    //       sourceMap: process.env.NODE_ENV === 'production'
    //     },
    //   }]
    // }),
    // new HappyPack({
    //   id: 'scss',
    //   threads: 4,
    //   loaders: [
    //     { loader: 'css-loader' },
    //     { loader: 'fast-sass-loader' }
    //   ]
    // }),
    // new HappyPack({
    //   id: 'less',
    //   threads: 4,
    //   loaders: [
    //     { loader: 'css-loader' },
    //     { loader: 'fast-sass-loader'}
    //   ]
    // }),
  ],
};
debug('webpack base配置创建成功');
