const path = require('path');

// Try to load dependencies that might not exist in Cloudflare environment
let exec, fs, execAsync, readFileAsync;
try {
  exec = require('child_process').exec;
  fs = require('fs');
  const util = require('util');
  execAsync = util.promisify(exec);
  readFileAsync = util.promisify(fs.readFile);
} catch (e) {
  // Ignore errors in environments where these modules are missing
}

const SCRIPT_PATH = path.join(__dirname, '../scripts/spotify_totp.py');
// Require the JSON directly so it gets bundled
// check if file exists before requiring to avoid build error? 
// No, user has the file.
let bundledSecrets = null;
try {
  bundledSecrets = require('../scripts/secretBytes.json');
} catch(e) {
  console.warn('Could not load bundled secrets');
}

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

// Initialize with bundled secrets if available
if (bundledSecrets && Array.isArray(bundledSecrets) && bundledSecrets.length > 0) {
  bundledSecrets.sort((a, b) => b.version - a.version);
  currentSecret = bundledSecrets[0];
}

async function updateSecrets() {
  if (!execAsync || !readFileAsync) {
    console.log('Skipping secret update: child_process or fs not available');
    return;
  }

  console.log('Updating Spotify TOTP secrets...');
  try {
    const scriptsDir = path.dirname(SCRIPT_PATH);
    await execAsync(`python3 ${SCRIPT_PATH} --all`, { cwd: scriptsDir });
    
    // We can try to read the file if fs is available
    // But in a worker, fs might be mocked but empty. 
    // This part is strictly for local Node.js usage.
    const SECRET_FILE_PATH = path.join(__dirname, '../scripts/secretBytes.json');
    const data = await readFileAsync(SECRET_FILE_PATH, 'utf8');
    const secrets = JSON.parse(data);
    
    if (Array.isArray(secrets) && secrets.length > 0) {
      secrets.sort((a, b) => b.version - a.version);
      currentSecret = secrets[0];
      console.log(`Updated secret to version ${currentSecret.version}`);
    }
  } catch (error) {
    console.error('Failed to update secrets:', error.message);
  }
}

// Initial update only if we can
if (execAsync) {
  updateSecrets();
  setInterval(updateSecrets, 1000 * 60 * 60);
}

function getLatestTotpSecret() {
  return currentSecret;
}

module.exports = {
  getLatestTotpSecret
};
