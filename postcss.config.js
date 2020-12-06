/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/* eslint import/no-unresolved: [2, { commonjs: true, amd: true }] */

const envConf = require('./webpack_config_utils/eviroment');
const tailwindcss = require('tailwindcss');
let postCssPlugins = [
  tailwindcss('./tailwind.config.js'),
  require('autoprefixer'),
];

if (envConf.getEnv() === envConf.ENV.PRODUCTION) {
  postCssPlugins = [
    ...postCssPlugins,
    require('@fullhuman/postcss-purgecss')({
      content: ['./src/*.html', './src/design/**/*.js', './src/util/**/*.js'],
      defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
    }),
    require('cssnano')({
      preset: 'default',
    }),
  ];
}

module.exports = {
  plugins: [...postCssPlugins],
};