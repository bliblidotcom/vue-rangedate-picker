const path = require('path')
const webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const webpackConfig = {
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue: 'vue/dist/vue.js',
      '@': resolve('src')
    }
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules|vue\/dist/,
      loader: 'babel-loader'
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          js: 'babel-loader!eslint-loader'
        }
      }
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    })
  ],
  devtool: '#inline-source-map'
}

module.exports = {
  basePath: '',
  files: [
    '../test/unit/index.js'
  ],
  exclude: [
  ],
  frameworks: ['mocha'],
  preprocessors: {
    '../test/unit/index.js': ['webpack', 'sourcemap']
  },
  webpack: webpackConfig,
  webpackMiddleware: {
    noInfo: true
  }
}
