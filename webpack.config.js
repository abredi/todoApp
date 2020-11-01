const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack_config_utils/webpack.config.common');

module.exports = (env) => {
  console.log(env)
  if (!env) {
    throw new Error('env is not provided.')
  }

  const envSpecificConfig = require(`./webpack_config_utils/webpack.config.${env}`);  
  mergedConfig = webpackMerge(commonConfig, envSpecificConfig);

  return mergedConfig;
}