// const webpack = require('webpack');

// module.exports = function override(config, env) {
//   // Add custom configuration to override crypto createHash function
//   config.plugins.push(
//     new webpack.ProvidePlugin({
//       crypto: 'crypto',
//     })
//   );

//   // Add custom code to override createHash method
//   const crypto = require('crypto');
//   const crypto_orig_createHash = crypto.createHash;
//   crypto.createHash = (algorithm) =>
//     crypto_orig_createHash(algorithm === 'md4' ? 'sha256' : algorithm);

//   return config;
// };

// Apply the override early
const crypto = require('crypto');
const crypto_orig_createHash = crypto.createHash;
crypto.createHash = (algorithm) =>
  crypto_orig_createHash(algorithm === 'md4' ? 'sha256' : algorithm);

const webpack = require('webpack');

module.exports = function override(config, env) {
  // Provide the crypto module
  config.plugins.push(
    new webpack.ProvidePlugin({
      crypto: 'crypto',
    })
  );

  console.log('Webpack configuration:', JSON.stringify(config, null, 2));

  return config;
};


