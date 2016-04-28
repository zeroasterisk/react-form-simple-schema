// IMPORTANT
// ---------
// This is an auto generated file with React CDK.
// Do not modify this file.
// Use `.storybook/user/modify_webpack_config.js instead`.

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
//const updateConfig = require('./user/modify_webpack_config');

const config = {
  entry: [
    'webpack-hot-middleware/client',
    'tether',
    'bootstrap-loader'
  ],
  resolve: { extensions: [ '', '.js' ] },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      "window.Tether": "tether"
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.css?$/,
        loaders: ['style', 'raw'],
        include: path.resolve(__dirname, '../'),
      },
      {
        test: /\.css$/,
        loaders: [ 'style', 'css', 'postcss' ],
        include: path.resolve(__dirname, '../')
      },
      {
        test: /\.scss$/,
        loaders: [ 'style', 'css', 'postcss', 'sass' ],
        include: path.resolve(__dirname, '../')
      },
      {
        test: /\.less$/,
        loaders: [ 'style', 'css', 'postcss', 'less' ],
        include: path.resolve(__dirname, '../')
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url?limit=10000"
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file'
      },

      // Use one of these to serve jQuery for Bootstrap scripts:

      // Bootstrap 4
      { test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery' },

      // Bootstrap 3
      { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' },
    ],
  },
  postcss: [ autoprefixer ]
};

//updateConfig(config);
module.exports = config;
