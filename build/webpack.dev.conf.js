
const utils = require('./utils');
const path = require('path');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const debug = require('debug')('app:config:dev');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const zcyHtmlBaseData = require('@zcy/html-base-data');
// const MergeRouterPlugin = require('./merge-router-plugin');

debug(`合并webpack ${config.dev.env.NODE_ENV} 环境配置`);

const devWebpackConfig = merge(baseWebpackConfig, {
  devtool: config.dev.devtool,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: process.env.NODE_ENV,
        MOCK: process.env.MOCK,
      }
    }),

    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template:'../src/index.html',
      inject: true,
      // data: zcyHtmlBaseData,
    }),
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

if (config.dev.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  devWebpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

debug(`合并webpack ${config.dev.env.NODE_ENV} 环境配置成功`);
module.exports = devWebpackConfig;
