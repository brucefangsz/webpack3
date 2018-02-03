const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: {
    vendor: [
      'react', 'react-dom', 'react-router-dom', 'mirrorx', 'antd'
    ],
    app: ['babel-polyfill','./src/index']
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''
  },
  externals: {
    //'react': 'React', 'react-dom': 'ReactDOM'
  },
  resolve: {
    extensions: [
      '.jsx', '.js', '.json','.less'
    ],
    alias: {
      containers: path.resolve(__dirname, 'src/containers/'),
      components: path.resolve(__dirname, 'src/components/'),
      assets: path.resolve(__dirname, 'src/assets/'),
      models: path.resolve(__dirname, 'src/models/')
    }
  },
  module: {
    rules: [{
      test: /\.js[x]?$/,
      exclude: /(node_modules|bower_components)/,
      include: path.resolve('src'),
      use: ['babel-loader']
    }, {
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        use: [
          'css-loader', 'postcss-loader', 'less-loader'
        ],
        fallback: 'style-loader'
      })
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'postcss-loader']
      })
    }, {
      test: /\.(png|jpg|jpeg|gif)(\?.+)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          name: 'images/[name].[hash:8].[ext]',
          limit: 8192
        }
      }]
    }, {
      test: /\.(woff|woff2|eot|svg|ttf|otf)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[hash:8].[ext]'
        }
      }]
    }]
  },
  plugins: [
    new UglifyJsPlugin({
      compress: false,
      sourceMap: true
    }),
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: 'body',
      favicon: './src/assets/favicon.ico',
      hash: true
    })
  ]
};
