const express = require('express');

const router = express.Router();

const SONGLINK_API_BASE = 'https://api.song.link/v1-alpha.1/links';
const SONGLINK_BACKUP_API_BASE = 'https://tracks.monochrome.tf/api/links';

// 30 days cache for browser
const BROWSER_CACHE_TTL = 2_592_000;

function buildSonglinkUrl(params, useBackup = false) {
  const url = new URL(useBackup ? SONGLINK_BACKUP_API_BASE : SONGLINK_API_BASE);
  url.searchParams.set('url', params.url);

  if (params.userCountry) {
    url.searchParams.set('userCountry', params.userCountry);
  }
  if (params.songIfSingle !== undefined) {
    url.searchParams.set('songIfSingle', params.songIfSingle.toString());
  }
  if (params.platform) {
    url.searchParams.set('platform', params.platform);
  }
  if (params.type) {
    url.searchParams.set('type', params.type);
  }
  if (params.id) {
    url.searchParams.set('id', params.id);
  }
  if (params.key) {
    url.searchParams.set('key', params.key);
  }

  return url.toString();
}

router.get('/', async (req, res) => {
  const origin = req.headers.origin;

  // Build query params
  const params = {
    url: req.query.url || '',
    userCountry: req.query.userCountry || undefined,
    songIfSingle: req.query.songIfSingle === 'true' ? true : undefined,
    platform: req.query.platform || undefined,
    type: req.query.type || undefined,
    id: req.query.id || undefined,
    key: req.query.key || undefined,
    preferBackup: req.query.preferBackup === 'true' ? true : undefined
  };

  // Validate required parameter
  if (!params.url) {
    res.set({
      'Access-Control-Allow-Origin': origin || '*',
      'Cache-Control': 'no-cache'
    });
    return res.status(400).json({ error: 'Missing required parameter: url' });
  }

  // Fetch from Songlink API
  const useRandomBackup = Math.random() < 0.5;
  const shouldTryBackupFirst = params.preferBackup === true ? true : useRandomBackup;

  const primaryUrl = buildSonglinkUrl(params, false);
  const backupUrl = buildSonglinkUrl(params, true);

  try {
    const firstUrl = shouldTryBackupFirst ? backupUrl : primaryUrl;
    const firstSource = shouldTryBackupFirst ? 'backup' : 'primary';

    const response = await fetch(firstUrl, {
      headers: {
        'User-Agent': 'BiniLossless/3.0',
        Accept: 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn(`${firstSource} Songlink API failed:`, response.status, errorText);

      // Try the other API
      const secondUrl = shouldTryBackupFirst ? primaryUrl : backupUrl;
      const secondSource = shouldTryBackupFirst ? 'primary' : 'backup';
      console.log(`Attempting ${secondSource} Songlink API...`);

      const backupResponse = await fetch(secondUrl, {
        headers: {
          'User-Agent': 'BiniLossless/3.0',
          Accept: 'application/json'
        }
      });

      if (!backupResponse.ok) {
        const backupErrorText = await backupResponse.text();
        console.error(
          `${secondSource} Songlink API also failed:`,
          backupResponse.status,
          backupErrorText
        );

        res.set({
          'Access-Control-Allow-Origin': origin || '*',
          'Cache-Control': 'no-cache'
        });
        return res.status(backupResponse.status).json({
          error: 'Both Songlink APIs failed',
          primaryStatus: shouldTryBackupFirst ? backupResponse.status : response.status,
          backupStatus: shouldTryBackupFirst ? response.status : backupResponse.status,
          message: backupErrorText
        });
      }

      const backupData = await backupResponse.json();

      res.set({
        'Access-Control-Allow-Origin': origin || '*',
        'Cache-Control': `public, max-age=${BROWSER_CACHE_TTL}`,
        'X-Songlink-Source': secondSource
      });
      return res.json(backupData);
    }

    const data = await response.json();

    res.set({
      'Access-Control-Allow-Origin': origin || '*',
      'Cache-Control': `public, max-age=${BROWSER_CACHE_TTL}`,
      'X-Songlink-Source': firstSource
    });
    return res.json(data);
  } catch (error) {
    console.error('Songlink API fetch error:', error);

    // Try backup API as last resort
    try {
      console.log('Primary API threw exception, trying backup...');
      const fallbackBackupUrl = buildSonglinkUrl(params, true);

      const backupResponse = await fetch(fallbackBackupUrl, {
        headers: {
          'User-Agent': 'BiniLossless/3.0',
          Accept: 'application/json'
        }
      });

      if (!backupResponse.ok) {
        throw new Error(`Backup API returned ${backupResponse.status}`);
      }

      const backupData = await backupResponse.json();

      res.set({
        'Access-Control-Allow-Origin': origin || '*',
        'Cache-Control': `public, max-age=${BROWSER_CACHE_TTL}`,
        'X-Songlink-Source': 'backup-fallback'
      });
      return res.json(backupData);
    } catch (backupError) {
      console.error('Backup Songlink API also failed:', backupError);

      res.set({
        'Access-Control-Allow-Origin': origin || '*',
        'Cache-Control': 'no-cache'
      });
      return res.status(502).json({
        error: 'Failed to fetch from both Songlink APIs',
        primaryError: error instanceof Error ? error.message : 'Unknown error',
        backupError: backupError instanceof Error ? backupError.message : 'Unknown error'
      });
    }
  }
});

module.exports = router;
