const path = require('path');
const merge = require('webpack-merge');
const apiMocker = require('webpack-api-mocker');
const debug = require('debug')('app:config:dev');
const devWebpackConfig = require('./webpack.dev.conf');
const config = require('../config');

const contentBase = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
const devServerConfig = merge(devWebpackConfig, {
  devServer: {
    clientLogLevel: 'none',
    contentBase: contentBase,
    host: 'localhost',
    hot: true,
    compress: true,
    port: config.dev.port,
    before(app) {
      apiMocker(app, path.resolve('mock/index.js'), {
        proxy: {
          '/api/*': 'https://cnodejs.org',
        },
        changeHost: true,
      })
    },
    after: function(app, server) {
      // 做些有趣的事
      console.log('做些有趣的事:', server);
    }
  },
});
module.exports = devServerConfig;

