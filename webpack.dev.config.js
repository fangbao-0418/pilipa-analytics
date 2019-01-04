var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
    './dev/index'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'dev')],
        use: [
          'source-map-loader',
          'eslint-loader'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'dev')],
        use: [
          'babel-loader'
        ]
      },
      {
        enforce: 'pre',
        test: /\.tsx$/,
        include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'dev')],
        use: [
          'tslint-loader'
        ]
      },
      {
        test: /\.(ts|tsx)$/,
        include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'dev')],
        loader: 'awesome-typescript-loader',
        options: {
          useCache: true,
          useBabel: true,
          babelOptions: {
            babelrc: false, /* Important line */
            presets: [
              [
                'env',
                {
                  'targets': {
                    'browsers': ['> 5%', 'last 2 versions']
                  },
                  'modules': false
                }
              ],
              'stage-0',
              'react'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader'
        }]
      },
      {
        test: /\.(png|jpe?g|git)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: '[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './dev/index.html',
      inject: 'true',
      favicon: null
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.min.js']
  },
  devtool: 'source-map'
}
