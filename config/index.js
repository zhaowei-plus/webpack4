const path = require('path');

module.exports = {
  dev: {
    env: {
      NODE_ENV: '"production"',
      mode: 'development'
    },
    port: 6002,
    assetsPublicPath: '/',
    assetsSubDirectory: 'assets',
    autoOpenBrowser: true,
    cssSourceMap: false,
    devtool: 'cheap-module-eval-source-map',
    bundleAnalyzerReport: true,
    proxyOptions: require('./proxy'),
  },
  test: {
    env: {
      NODE_ENV: '"test"',
      mode: 'production'
    },
    assetsPublicPath: '/',
    assetsSubDirectory: 'template_assets', // 需修改
  },
  build: {
    env: {
      NODE_ENV: '"production"',
      mode: 'production'
    },
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsPublicPath: 'https://sitecdn.zcy.gov.cn/',
    assetsSubDirectory: 'template_assets', // 需修改
    productionSourceMap: true,
    devtool: '#source-map',
    templatePath: './template',
  },
};
