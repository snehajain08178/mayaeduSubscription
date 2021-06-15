const Production = require('./production');
const Development = require('./development');
const Staging = require('./staging');

const config = {
  production: Production,
  development: Development,
  staging: Staging
};
// get app environment
const env = process.env.BUILD_ENV || 'development';
const configFile = config[env] || config.development;

// export config file
module.exports = configFile;
