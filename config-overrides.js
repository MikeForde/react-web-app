const crypto = require('crypto');
const webpack = require('webpack');

module.exports = function override(config, env) {
  // Ensure crypto module's createHash does not use MD4
  const crypto_orig_createHash = crypto.createHash;
  crypto.createHash = (algorithm) =>
    crypto_orig_createHash(algorithm === 'md4' ? 'sha256' : algorithm);

  // Modify Webpack persistent cache configuration if it exists
  if (config.cache && config.cache.type === 'filesystem') {
    config.cache.buildDependencies = {
      config: [__filename], // This is a workaround to invalidate the cache
    };

    config.cache.version = crypto
      .createHash('sha256')
      .update(config.cache.version || '')
      .digest('hex');
  }

  // Add ProvidePlugin to ensure crypto is available
  config.plugins.push(
    new webpack.ProvidePlugin({
      crypto: 'crypto',
    })
  );

  return config;
};
