const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const config = require('config')

const baseConfig = require('./webpack.base')

module.exports = merge(baseConfig, {
  entry: path.resolve(__dirname, 'server.js'),
  devtool: '#cheap-module-source-map',
  mode: 'development',
  plugins: [],
})
