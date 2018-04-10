const path = require('path')
const baseConfig = require('./webpack.base')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const HappyPack = require('happypack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const os = require('os')

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = merge(baseConfig, {
  entry: {
    main: path.resolve(__dirname, '../main.js'),
    vendor: ['react', 'react-router', 'mobx', 'mobx-react'],
  },
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'static/js/[name].[hash].js',
    chunkFilename: 'static/js/[name].[hash].chunk.js',
    publicPath: '/',
  },
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      name: 'vendor',
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 2,
          name: 'common',
        },
      },
    },
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'happypack/loader?id=js-happypack',
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['../build/*.*', '../build/*'], {
      root: path.resolve(__dirname, '../build'),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../template.html'),
      path: path.join(__dirname, '../build'),
      excludeChunks: ['base'],
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
      },
    }),
    new webpack.HashedModuleIdsPlugin(),
    new HappyPack({
      id: 'js-happypack',
      threadPool: happyThreadPool,
      loaders: ['babel-loader?cacheDirectory=true'],
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        ecma: 8,
        compress: {
          warnings: false,
          // Disabled because of an issue with Uglify breaking seemingly valid code:
          // https://github.com/facebook/create-react-app/issues/2376
          // Pending further investigation:
          // https://github.com/mishoo/UglifyJS2/issues/2011
          comparisons: false,
        },
        mangle: {
          safari10: true,
        },
        output: {
          comments: false,
          // Turned on because emoji and regex is not minified properly using default
          // https://github.com/facebook/create-react-app/issues/2488
          ascii_only: true,
        },
      },
      // Use multi-process parallel running to improve the build speed
      // Default number of concurrent runs: os.cpus().length - 1
      parallel: true,
      // Enable file caching
      cache: true,
      sourceMap: true,
    }),
  ],
})
