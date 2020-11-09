const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack_config_utils/webpack.config.common');
const envConf = require('./webpack_config_utils/eviroment');

module.exports = (env) => {
  if (!env) {
    throw new Error('env is not provided.');
  }

  envConf.setEnv(env);
  // eslint-disable-next-line
  const envSpecificConfig = require(`./webpack_config_utils/webpack.config.${env}`);
  const mergedConfig = webpackMerge(commonConfig, envSpecificConfig);

  return mergedConfig;
};
