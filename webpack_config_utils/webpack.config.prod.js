const zlib = require('zlib');
const glob = require('glob');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const PurgecssPlugin = require('purgecss-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

const appPath = require('./common.path');

module.exports = {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.s?css/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "postcss-loader"],
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin("style.css"),
    new TerserPlugin({
      parallel: true,
      terserOptions: {
        ecma: 6,
      },
    }),
    new CompressionPlugin({
      filename: "[path].br[query]",
      algorithm: "brotliCompress",
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        level: 11,
      },
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false,
    }),

    new HtmlPlugin({
      title: "Todo App",
      template: `${appPath.ENTRY_SRC}/template.html`,
    }),

    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        safe: true,
        discardComments: {
          removeAll: true,
        },
      },
    }),
  ],
};