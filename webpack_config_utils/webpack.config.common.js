const appPath = require('./common.path');

module.exports = {
  entry: appPath.ENTRY,
  output: {
    filename: 'bundle.js',
    path: appPath.OUTPUT
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|ico)/,
        use: 'url-loader'
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          minimize: true,
        },
      },
    ]
  },
}

