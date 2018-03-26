const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const NyanProgressPlugin = require('nyan-progress-webpack-plugin')
const HappyPack = require('happypack')
const os = require('os')

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = {
  entry: {
    vendor: ['react', 'react-dom', 'mobx', 'mobx-react', 'styled-components'],
    main: path.resolve(__dirname, '../main.js'),
  },
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new NyanProgressPlugin(),
  ],
  resolve: {
    extensions: ['*', '.js', 'jsx'],
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
          {
            loader:'happypack/loade?id=jsHappyr',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'image/png',
              name: 'static/images/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/fonts/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'application/font-woff',
              name: 'static/fonts/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'application/octet-stream',
              name: 'static/fonts/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'image/svg+xml',
              name: 'images/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  // plugins: [
  //   new HappyPack({
  //     id: 'jsHappy',
  //     cache: true,
  //     threadPool: happyThreadPool,
  //     loaders: [
  //       {
  //         path: 'babel',
  //         query: {
  //           cacheDirectory: '.webpack_cache',
  //           presets: ['es2015', 'react'],
  //         },
  //       },
  //     ],
  //   }),
  // ],
}
