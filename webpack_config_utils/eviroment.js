let currentEnviroment = 'dev';

module.exports = {
  ENV: {
    PRODUCTION: 'prod',
    DEVELOPMENT: 'dev',
  },

  setEnv: (env) => {
    currentEnviroment = env;
  },

  getEnv: () => currentEnviroment,
};
