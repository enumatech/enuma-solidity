const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './example/app.js',
  mode: 'development',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: true
  },

  resolve: {
    alias: {
      'enuma-solidity/validators': path.join(__dirname, 'validators.js'),
      'enuma-solidity/web3': path.join(__dirname, 'web3.js')
    }
  },

  module: {
    rules: [
      {
        test: /\.sol$/,
        use: {
          loader: path.resolve(__dirname, './src/loader.js'),
          options: {
            provider: 'ws://localhost:7545'
          }
        }
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin()]
};
