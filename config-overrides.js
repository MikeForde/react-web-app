const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

// Load the patched version of createEnvironmentHash
const createEnvironmentHashPath = path.resolve(__dirname, 'patch-createEnvironmentHash.js');
const createEnvironmentHash = require(createEnvironmentHashPath);

module.exports = function override(config, env) {
  // Replace the createEnvironmentHash function in the webpack configuration
  const createEnvironmentHashModulePath = 'react-scripts/config/webpack/persistentCache/createEnvironmentHash.js';
  const fullPathToCreateEnvironmentHash = require.resolve(createEnvironmentHashModulePath);
  
  // Override the file with the patched version
  fs.writeFileSync(fullPathToCreateEnvironmentHash, `module.exports = ${createEnvironmentHash.toString()}`);

  // Ensure the crypto module is available
  config.plugins.push(
    new webpack.ProvidePlugin({
      crypto: 'crypto',
    })
  );

  return config;
};
