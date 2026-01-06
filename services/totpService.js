const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const util = require('util');

const execAsync = util.promisify(exec);
const readFileAsync = util.promisify(fs.readFile);

const SCRIPT_PATH = path.join(__dirname, '../scripts/spotify_totp.py');
const SECRET_FILE_PATH = path.join(__dirname, '../scripts/secretBytes.json'); // We'll use secretBytes.json as it has the needed format

// Fallback secret (from provided code)
const FALLBACK_SECRET = [
  44, 55, 47, 42, 70, 40, 34, 114, 76, 74, 50, 111, 120, 97, 75, 76, 94, 102, 43, 69, 49, 120, 118,
  80, 64, 78
];
const FALLBACK_VERSION = 61;

let currentSecret = {
  version: FALLBACK_VERSION,
  secret: FALLBACK_SECRET
};

async function updateSecrets() {
  console.log('Updating Spotify TOTP secrets...');
  try {
    // Run the Python script with --all flag to generate files
    // We execute it in the scripts directory so files are generated there
    const scriptsDir = path.dirname(SCRIPT_PATH);
    await execAsync(`python3 ${SCRIPT_PATH} --all`, { cwd: scriptsDir });
    
    // Read the generated file
    const data = await readFileAsync(SECRET_FILE_PATH, 'utf8');
    const secrets = JSON.parse(data);
    
    // Get the latest version (highest version number)
    if (Array.isArray(secrets) && secrets.length > 0) {
      // Sort by version descending
      secrets.sort((a, b) => b.version - a.version);
      currentSecret = secrets[0];
      console.log(`Updated secret to version ${currentSecret.version}`);
    } else {
      console.warn('No secrets found in output file');
    }
  } catch (error) {
    console.error('Failed to update secrets:', error.message);
    // Keep using existing or fallback secret
  }
}

// Initial update
updateSecrets();

// Schedule updates every hour
setInterval(updateSecrets, 1000 * 60 * 60);

function getLatestTotpSecret() {
  return currentSecret;
}

module.exports = {
  getLatestTotpSecret
};
