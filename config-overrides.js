const webpack = require('webpack');
const crypto = require('crypto');

module.exports = function override(config, env) {
  // Override the Webpack configuration directly
  config.plugins = (config.plugins || []).map((plugin) => {
    if (plugin.constructor.name === 'EnvironmentPlugin') {
      plugin.defaultValues = {
        ...plugin.defaultValues,
        // Override the environment hash function to use SHA256
        BUILD_ENVIRONMENT_HASH: crypto
          .createHash('sha256')
          .update(JSON.stringify(process.env))
          .digest('hex'),
      };
    }
    return plugin;
  });

  // Provide the crypto module
  config.plugins.push(
    new webpack.ProvidePlugin({
      crypto: 'crypto',
    })
  );

  return config;
};
