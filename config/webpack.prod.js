const path = require('path')
const baseConfig = require('./webpack.base')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const HappyPack = require('happypack')
const os = require('os')

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = merge(baseConfig, {
  entry: {
    main: path.resolve(__dirname, '../main.js'),
    vendor: ['react'],
  },
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'static/js/[name].[hash].js',
    chunkFilename: 'static/js/[name].[hash].chunk.js',
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
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
    new ParallelUglifyPlugin({
      cacheDir: '.cache/',
      uglifyJS: {
        output: {
          comments: false,
        },
        compress: {
          warnings: false,
        },
      },
    }),
    new HappyPack({
      id: 'js-happypack',
      threadPool: happyThreadPool,
      loaders: ['babel-loader?cacheDirectory=true'],
    }),
  ],
})
