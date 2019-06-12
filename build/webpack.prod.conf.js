const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const debug = require('debug')('app:config:prod');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default;
// const MergeRouterPlugin = require('./merge-router-plugin');
// const zcyHtmlBaseData = require('@zcy/html-base-data');

debug(`合并webpack ${config.build.env.NODE_ENV} 环境配置`);
const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true,
    }),
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].js'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.build.env,
      __DEV__: false,
    }),

    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash:8].css')),

    new CSSSplitWebpackPlugin({
      size: 3400,
      filename: utils.assetsPath('css/[name]-[part].css'),
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template:'./src/index.html',
      inject: true,
      // data: zcyHtmlBaseData,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
      chunksSortMode: 'dependency',
      // data: zcyHtmlBaseData,
    }),
    new webpack.HashedModuleIdsPlugin(),
  ],
  // 优化处理
  optimization: {
    minimize: false,
    splitChunks: {
      // 表示选择分割那些代码块
      // 'all'（所有代码块），'async'（按需加载的代码块），'initial'（初始化代码块）
      chunks: "async",
      minSize: 30000, // 模块的最小体积，小于30K，就不生成新的chunk
      minChunks: 1, // 模块的最小被引用次数
      maxAsyncRequests: 5, // 按需加载的最大并行请求数
      maxInitialRequests: 3, // 一个入口最大并行请求数
      name: true,
      cacheGroups: {
        /**
         * 三方依赖库抽取
         */
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10 // 优先级
        },

        // 打包
        manifest: {
          minChunks: Infinity,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
  }
});

debug(`合并webpack ${config.build.env.NODE_ENV} 环境配置成功`);
module.exports = webpackConfig;
