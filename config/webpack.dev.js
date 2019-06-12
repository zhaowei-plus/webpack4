const path = require('path');
const webpack = require('webpack');
const uglifyPlugin = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

// 使用PurifyCSS可以大大减少CSS冗余，消除未使用的css
const purifyCSSPlugin = require("purifycss-webpack");
// 因为我们需要同步检查html模板，所以我们需要引入node的glob对象使用
const glob = require('glob-all');
// 使用多进程打包
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');

// 采用多进程打包构建
const HappyPack = require('happypack');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const apiMocker = require('webpack-api-mocker');

const website = {
  publicPath: 'http://localhost:8080/',
};

module.exports = {
  mode: 'development',
  entry: {
    main: './src/main.js',
    main2: './src/main2.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    // 用于处理静态文件路径，配置之后，文件引用会加上前缀
    publicPath: website.publicPath,
  },
  // 优化处理
  // optimization: {
  //   minimize: false,
  //   // SplitChunksPlugin
  //   splitChunks: {
  //     // 表示选择分割那些代码块
  //     // 'all'（所有代码块），'async'（按需加载的代码块），'initial'（初始化代码块）
  //     chunks: "async",
  //     minSize: 30000, // 模块的最小体积，小于30K，就不生成新的chunk
  //     minChunks: 1, // 模块的最小被引用次数
  //     maxAsyncRequests: 5, // 按需加载的最大并行请求数
  //     maxInitialRequests: 3, // 一个入口最大并行请求数
  //     automaticNameDelimiter: '~', // 文件名的连接符
  //     name: true,
  //     cacheGroups: { // 缓存组
  //       // 将node_modules 中的模块打包到 vendors 的bundle中
  //       vendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         priority: -10 // 优先级
  //       },
  //
  //       // 所有引用超过2此的模块打包到 default bundle中
  //       default: {
  //         minChunks: 2,
  //         priority: -20,
  //         reuseExistingChunk: true
  //       }
  //     }
  //   },
  //   // 配置 runtimeChunk 会给每个入口添加一个只包含runtime的额外的代码块
  //   runtimeChunk: {
  //     name: entrypoint => `manifest.${entrypoint.name}`
  //   }
  // },
  // 模块：例如解读CSS，图片如何转换、压缩
  module: {
    rules: [
      //scss loader
      {
        test: /\.(scss|sass)$/,
        // use: [
        //   { loader: "style-loader" },
        //   { loader: "css-loader" },
        //   { loader: "sass-loader" }
        //   ]
        // use: extractTextPlugin.extract({
        //   use: [{
        //     loader: "css-loader"
        //   }, {
        //     loader: "sass-loader"
        //   }],
        //   // use style-loader in development
        //   fallback: "style-loader"
        // })
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'fast-sass-loader',
          // 'HappyPack/loader?id=scss'
        ],
      },
      // less 配置 + 分离 less
      {
        test: /\.less$/,
        // use: [
        //   { loader: 'style-loader' },
        //   { loader: 'css-loader' },
        //   { loader: 'less-loader' }, // 编译less
        // ],
        // 分离 less
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
      // css loader
      {
        test: /\.css$/,
        // use: [
        //   { loader: 'style-loader' },
        //   { loader: 'css-loader' },
        // ],
        // css分离后这里需要重新配置，提取css
        // use: extractTextPlugin.extract({
        //   use: [
        //     { loader: "css-loader" },
        //     // postcss 用于处理 css 前缀
        //     { loader: "postcss-loader" }
        //   ],
        //   fallback: {
        //     loader: 'style-loader',
        //     // options: {
        //     //   singleton: true // 表示将页面上的所有css都放到一个style标签内
        //     // }
        //   },
        // }),
        use:[
          MiniCssExtractPlugin.loader,
          // 'HappyPack/loader?id=css'
          'css-loader',
        ],
      },
      //图片 loader
      {
        test:/\.(png|jpg|gif|jpeg)/,  //是匹配图片文件后缀名称
        use: [{
          loader:'url-loader', //是指定使用的loader和loader的配置参数
          options:{
            limit:500,  //是把小于500B的文件打成Base64的格式，写入JS
            outputPath:'images',  //打包后的图片放到images文件夹下
          }
        }]
      },
      // 配置在html img 引入图片的打包问题
      {
        test: /\.(htm|html)$/i,
        use:[ 'html-withimg-loader']
      },
      //babel 配置
      {
        test:/\.(jsx|js)$/,
        use:{
          loader:'babel-loader'
        },
        exclude:/node_modules/
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: process.env.NODE_ENV,
        MOCK: process.env.MOCK,
      }
    }),
    // Uglify是压缩js,现在已经不需要了,只需要在script里面写成
    // "build": "webpack --mode production", 就自动压缩额
    // new Uglify(),
    // new uglifyPlugin(),

    // 默认删除 dist 目录
    // new CleanWebpackPlugin(),

    new htmlPlugin({
      minify: {
        // 对HTML文件进行压缩
        removeAttributeQuotes:true  // removeAttrubuteQuotes是却掉属性的双引号
      },
      hash:true, // 开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
      template:'./src/index.html' // 是要打包的html模版路径和文件名称
    }),

    // 配置最终打包之后的 css 目录
    // new extractTextPlugin('css/index.css'),
    new MiniCssExtractPlugin({
      filename: 'css/index.css',
    }),

    // // 此插件必须配合 extract-text-webpack-plugin 使用，放在 html-webpack-plugin 后面
    new purifyCSSPlugin({
      paths: glob.sync([ // 传入多文件路径
        path.resolve(__dirname, '../src/*.html'), // 处理根目录下的html文件
        path.resolve(__dirname, '../src/*.js') // 处理src目录下的js文件
      ])
    }),

    // new ParallelUglifyPlugin({
    //   cacheDir: '.cache/',
    //   uglifyJS:{
    //     output: {
    //       comments: false
    //     },
    //     compress: {
    //       warnings: false
    //     }
    //   }
    // }),

    // js 打包
    /**
     * 它对file-loader和url-loader支持不好，所以这两个loader就不需要换成happypack
     *
     * */
    // new HappyPack({
    //   id: 'js',
    //   loaders: [{
    //     loader: 'babel-loader',
    //     options: {
    //       // cacheDirectory: true
    //     }
    //   }]
    // }),
    // new HappyPack({
    //   id: 'css',
    //   loaders: [{
    //     loader: 'css-loader',
    //   }]
    // }),
    // new HappyPack({
    //   id: 'scss',
    //   loaders: [{
    //     'loader': 'css-loader'
    //   }, {
    //     loader: 'fast-sass-loader',
    //   }]
    // }),
    // 预览模块组成
    // new BundleAnalyzerPlugin(),
  ],

  // // 开发环境的配置
  // devtool:{
  //
  // },

  devServer: {
    clientLogLevel: 'none',
    // 设置基本目录结构，用于找到程序打包地址
    contentBase: path.resolve(__dirname, '../dist'),
    // 服务器的IP地址
    host: 'localhost',
    hot: true,
    // 服务器压缩是否开启
    compress: true,
    port: 8080,
    before(app) {
      apiMocker(app, path.resolve('mock/index.js'), {
        proxy: {
          '/api/*': 'https://cnodejs.org',
        },
      })
    },
    after: function(app, server) {
      // 做些有趣的事
      console.log('做些有趣的事:', server);
    }
  },
};
