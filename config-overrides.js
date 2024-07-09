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

  // Find and modify the url-loader
  config.module.rules.forEach((rule) => {
    if (rule.oneOf) {
      rule.oneOf.forEach((oneOfRule) => {
        if (
          oneOfRule.loader &&
          oneOfRule.loader.includes('url-loader')
        ) {
          oneOfRule.options = {
            ...oneOfRule.options,
            name: 'static/media/[name].[hash:8].[ext]',
            limit: 10000,
          };
        }
      });
    }
  });

  return config;
};



