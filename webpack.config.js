var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var childProcess = require('child_process');

var BUILD_DIR = path.resolve(__dirname, 'dist/');
var APP_DIR = path.resolve(__dirname, 'src/');

var RELEASE = childProcess.execSync('git log -n 1 --pretty=format:"%H"').toString()


/** setting up environment variables */
const ENVIRONMENT_VARIABLES = [
  'GOOGLE_API_KEY',
  'API_BASE_URL',
  'WEBAPP_BASE_URL',
  'FACEBOOK_APP_ID',
  'ENV',
  'SENTRY_DSN_PUBLIC',
  'GOOGLE_ANALYTICS_PROPERTY',
  'SQUARE_APPLICATION_ID',
  'SQUARE_ACCESS_TOKEN',
]

const missing = ENVIRONMENT_VARIABLES.reduce((all, curr) => {
  if (!process.env[curr]) {
    all.push(curr)
  }
  return all
}, [])

if (missing.length > 0) {
  throw "You forgot to set the following environment variables: " + missing.join(', ')
}

let definedEnvironmentVariables = {}

ENVIRONMENT_VARIABLES.forEach((variable) => {
  definedEnvironmentVariables[`__${variable}__`] = `"${process.env[variable]}"` || null
})
/* done setting up env vars */

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/'
  },
  devtool: process.env.ENV === 'development' ? 'eval-source-map' : 'source-map',
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'RedPine',
      template: 'index.ejs',
      // inject: true,
      hash: true,
      env: {
        TAWK_URI: process.env.TAWK_URI,
        GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
        ENV: process.env.ENV,
        SENTRY_DSN_PUBLIC: process.env.SENTRY_DSN_PUBLIC,
        RELEASE,
        GOOGLE_ANALYTICS_PROPERTY: process.env.GOOGLE_ANALYTICS_PROPERTY,
        SQUARE_APPLICATION_ID: process.env.SQUARE_APPLICATION_ID,
        SQUARE_ACCESS_TOKEN: process.env.SQUARE_ACCESS_TOKEN,
      }
    }),
    new CopyWebpackPlugin([{
      from: 'src/Assets',
      to: 'Assets'
    }], {
      copyUnmodified: true
    }),
    new webpack.DefinePlugin(definedEnvironmentVariables)
  ],
  resolve: {
    alias: {
      Models: path.resolve(__dirname, 'src/Models'),
      Components: path.resolve(__dirname, 'src/Components'),
      Containers: path.resolve(__dirname, 'src/Containers'),
      globals: path.resolve(__dirname, 'src/globals.js'),
      enums: path.resolve(__dirname, 'src/enums.js')
    }
  }
};

module.exports = config;
