const crypto = require('crypto');

module.exports = function createEnvironmentHash(env) {
  const hash = crypto.createHash('sha256'); // Use sha256 instead of md4
  hash.update(JSON.stringify(env));

  return hash.digest('hex');
};
