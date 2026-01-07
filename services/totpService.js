// Fallback secret
const FALLBACK_SECRET = [
  44, 55, 47, 42, 70, 40, 34, 114, 76, 74, 50, 111, 120, 97, 75, 76, 94, 102, 43, 69, 49, 120, 118,
  80, 64, 78
];
const FALLBACK_VERSION = 61;

let currentSecret = {
  version: FALLBACK_VERSION,
  secret: FALLBACK_SECRET
};

// Try to load bundled secrets
let bundledSecrets = null;
try {
  bundledSecrets = require('../scripts/secretBytes.json');
} catch(e) {
  // console.warn('Could not load bundled secrets');
}

// Initialize with bundled secrets if available
if (bundledSecrets && Array.isArray(bundledSecrets) && bundledSecrets.length > 0) {
  bundledSecrets.sort((a, b) => b.version - a.version);
  currentSecret = bundledSecrets[0];
}

/**
 * Get the latest TOTP secret.
 * @param {object} [env] - Cloudflare Worker environment (request.env)
 * @returns {Promise<{version: number, secret: number[]}>}
 */
async function getLatestTotpSecret(env) {
  // Determine URL from Worker env or Node process.env
  const gistUrl = (env && env.SECRET_GIST_URL) || process.env.SECRET_GIST_URL;

  // If we have a Gist URL configured
  if (gistUrl) {
    try {
      // Fetch the raw file content from Gist
      const response = await fetch(gistUrl);
      if (response.ok) {
        const gistSecret = await response.json();
        
        if (gistSecret && gistSecret.version && Array.isArray(gistSecret.secret)) {
          // Update local memory cache if newer
          if (gistSecret.version > currentSecret.version) {
             currentSecret = gistSecret;
          }
          return gistSecret;
        }
      }
    } catch (e) {
      console.warn('Failed to fetch from Gist:', e);
    }
  }
  
  // Return local memory secret (from bundle or cache)
  return currentSecret;
}



module.exports = {
  getLatestTotpSecret
};
