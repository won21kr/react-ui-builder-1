const HtmlWebpackPlugin = require('html-webpack-plugin')
const nodePath = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const webpack = require('webpack')

const path = dir => nodePath.resolve(dir)

module.exports = {
  devtool: 'inline-source-map',
  context: path('./'),
  entry: [
    require.resolve('./.polyfills'),
    './src/index.jsx',
  ],
  output: {
    filename: '[name].bundle.js',
    path: path('dist'),
    pathinfo: true,
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ resource }) => /node_modules/.test(resource),
    }),
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: './template.html',
    }),
  ],
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: 'babel-loader',
      include: path('src'),
    }, {
      test: /\.css$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
      }],
      include: path('src'),
    }, {
      test: /\.(ico|jpg|png)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
        },
      }],
    }, {
      test: /\.(ttf|eot|svg)$/,
      use: 'file-loader',
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
}
