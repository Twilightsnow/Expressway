const webpack = require('webpack');
const path = require('path');
const SRC = path.join(__dirname, 'src');
const _join = (d) => path.join(__dirname, d);
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: {
    js: path.join(SRC, 'index.js')
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }, 
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, 
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader"
          }
        ]
      }, 
      {
        test: /\.json/,
        loader: 'json-loader'
      }, 
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'url',
        options: {
          limit: 80000
        }
      }
    ]
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: SRC,
    inline: true,
    progress: true,
    host: '0.0.0.0',
    disableHostCheck: true,
    stats: { color: true },
    port: 3000
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      image: path.join(SRC, 'image')
    }
  },
  externals:[{
    xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
  }],
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function(){
          return [
            require('precss'),
            require('autoprefixer')
          ]
        }
      }
    }),
    new OpenBrowserPlugin({
      url: 'http://localhost:3000'
    })
  ]
};
