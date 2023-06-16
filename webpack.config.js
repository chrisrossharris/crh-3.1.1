const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CnameWebpackPlugin = require('cname-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default

const IS_DEVELOPMENT = process.env.NODE_ENV === 'dev'

const dirApp = path.join(__dirname, 'app')
const dirAssets = path.join(__dirname, 'assets')
const dirStyles = path.join(__dirname, 'styles')
const dirNode = 'node_modules'

const folders = [
  'index.html',
  'about/index.html',
  'case/bird-dog-mafia/index.html',
  'case/work-garage-sale/index.html',
  'case/revenuers-cut/index.html',
  'case/mission-gait/index.html',
  'case/omy-gelato/index.html',
  'case/on-the-town/index.html',
  'case/har-tru/index.html',
  'case/lc-king/index.html',
  'case/cj-delua/index.html',
  'case/richmond-va/index.html'
];

const mapFolders = folders.map(filename => {
  return new HtmlWebpackPlugin({
    filename,
    template: path.join(__dirname, 'index.pug')
  })
})

module.exports = {
  entry: [
    path.join(dirApp, 'index.js'),
    path.join(dirStyles, 'index.scss')
  ],

  output: {
    filename: '[name].[contenthash].js'
  },

  resolve: {
    modules: [
      dirApp,
      dirAssets,
      dirNode
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      IS_DEVELOPMENT
    }),

    new webpack.ProvidePlugin({

    }),

    ...mapFolders,

    new CnameWebpackPlugin({
      domain: 'chrisrossharris.com'
    }),

    new CopyWebpackPlugin([
      {
        from: './app/service-worker.js',
        to: ''
      }
    ]),

    new CopyWebpackPlugin([
      {
        from: './offline',
        to: 'offline'
      }
    ]),

    new CopyWebpackPlugin([
      {
        from: './shared',
        to: ''
      }
    ]),

    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].css',
    }),

    new HTMLInlineCSSWebpackPlugin()
  ],

  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ['pug-loader']
      },

      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
      },

      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: IS_DEVELOPMENT
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: IS_DEVELOPMENT
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: IS_DEVELOPMENT
            }
          }
        ]
      },

      {
        test: /\.(jpe?g|png|gif|svg|fnt|webp)$/,
        loader: 'file-loader',
        options: {
          name (file) {
            return '[hash].[ext]'
          }
        }
      },

      {
        test: /\.(woff2?)$/,
        loader: 'file-loader',
        options: {
          name (file) {
            return '[name].[ext]'
          }
        }
      },

      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'raw-loader',
        exclude: /node_modules/
      },

      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'glslify-loader',
        exclude: /node_modules/
      }
    ]
  }
}
