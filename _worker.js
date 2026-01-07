
import app from './app.js';

/**
 * A minimal adapter to run an Express app on Cloudflare Workers.
 * This is not a full implementation of Node.js HTTP server, but enough for basic APIs.
 * usage of 'nodejs_compat' flag is required.
 */
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Normalize headers
    const headers = {};
    for (const [key, value] of request.headers) {
      headers[key.toLowerCase()] = value;
    }

    // Mock IncomingMessage
    // We rely on 'nodejs_compat' to provide some stream capabilities if needed,
    // but Express mainly just needs method, url, headers, and a way to get body.
    // For body, we pre-read it if possible or pass it? Express expects a stream.
    // However, without a heavy adapter, body parsing might be tricky.
    // We'll simplisticly handle JSON/Text bodies if content-type is set.
    
    const reqMock = {
      url: url.pathname + url.search,
      method: request.method,
      headers: headers,
      query: Object.fromEntries(url.searchParams),
      body: {}, 
      env: env, // Pass environment bindings (KV, etc) to Express
      unpipe: () => {},
      on: (event, cb) => {
        if (event === 'data' && request.body) {
           // ...
        }
        if (event === 'end') cb();
      }
    };

    // If method is POST/PUT, we need to handle body.
    // app.js uses `app.use(express.json())` which expects a stream.
    // We can try to feed the body to the stream?
    // A better approach for Workers + Express is to move to Hono or use a robust adapter library.
    // Since I cannot rewrite the app or fetch a large library easily, I will attempt to 
    // simply parse the body here and inject it, circumventing express.json() if possible?
    // No, express.json() checks headers.
    
    // Let's rely on a community strategy: buffering the body and emitting it.
    let reqBody = null;
    if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
      try {
        reqBody = await request.text();
      } catch (e) {}
    }

    // Enhance reqMock to be an Event Emitter
    const listeners = {};
    reqMock.on = (event, cb) => {
      if (!listeners[event]) listeners[event] = [];
      listeners[event].push(cb);
    };
    reqMock.emit = (event, data) => {
      if (listeners[event]) listeners[event].forEach(cb => cb(data));
    };
    
    // Start the app
    return new Promise((resolve) => {
      const resMock = {
        _headers: {},
        statusCode: 200,
        setHeader: (key, value) => {
          resMock._headers[key] = value;
        },
        getHeader: (key) => resMock._headers[key],
        writeHead: (code, headers) => {
            resMock.statusCode = code;
            if (headers) Object.assign(resMock._headers, headers);
        },
        status: (code) => {
            resMock.statusCode = code;
            return resMock;
        },
        send: (body) => {
            resolve(new Response(body, {
                status: resMock.statusCode,
                headers: resMock._headers
            }));
        },
        json: (body) => {
            resMock.setHeader('Content-Type', 'application/json');
            resolve(new Response(JSON.stringify(body), {
                status: resMock.statusCode,
                headers: resMock._headers
            }));
        },
        end: (body) => {
             resolve(new Response(body, {
                status: resMock.statusCode,
                headers: resMock._headers
            }));
        }
      };

      // Call app
      app(reqMock, resMock, (err) => {
        // Final handler
        if (err) {
             resolve(new Response('Internal Error', { status: 500 }));
        } else {
             resolve(new Response('Not Found', { status: 404 }));
        }
      });
      
      // Emit body if present
      if (reqBody) {
        // Express body parser listens for 'data' and 'end'
        // We need to defer this slightly to let middleware reuse attach listeners
        setTimeout(() => {
            reqMock.emit('data', reqBody);
            reqMock.emit('end');
        }, 0);
      } else {
         setTimeout(() => {
            reqMock.emit('end');
        }, 0);
      }
    });
  }
};
