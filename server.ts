/**
 * Copyright (c) 2021, Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
 */
/* eslint-disable no-mixed-operators */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */

import 'zone.js/dist/zone-node';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';
import * as http from 'http';
import * as https from 'https';
import { existsSync } from 'fs';
import { HttpOptions } from './src/interfaces/interfaces';
import { getAuthValue, isAuthNeeded } from './src/scripts/server-config-utils';
import { AppServerModule } from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();

  // Define the dist folder which will contain the static items
  const distFolder = join(process.cwd(), 'dist/browser');

  // define the location and filename of the index.html file
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  /*
   * Handle the proxy request.
   */
  function handleContentRequest(req, res, authValue) {
    // only proxy GET requests, ignore all other requests
    if (req.method !== 'GET') {
      return;
    }

    // build the URL to the real server
    let content = process.env.SERVER_URL.charAt(process.env.SERVER_URL.length - 1) === '/'
      ? 'content' : '/content';
    if (req.url.charAt(0) !== '/') {
      content = `${content}/`;
    }
    const oceUrl = `${process.env.SERVER_URL}${content}${req.url}`;

    // Add the authorization header
    const options: HttpOptions = {};
    if (authValue) {
      options.headers = { Authorization: authValue };
    }

    // define a function that writes the proxied content to the response
    const writeProxyContent = (proxyResponse) => {
      res.writeHead(proxyResponse.statusCode, proxyResponse.headers);
      proxyResponse.pipe(res, {
        end: true,
      });
    };

    // based on whether the Content server is HTTP or HTTPS make the request to it
    const proxy = (oceUrl.startsWith('https'))
      ? https.request(oceUrl, options, (proxyResponse) => writeProxyContent(proxyResponse))
      : http.request(oceUrl, options, (proxyResponse) => writeProxyContent(proxyResponse));

    // write the proxied response to this request's response
    req.pipe(proxy, {
      end: true,
    });
  }

  /*
   * Route handler for requests to '/content/'.
   *
   * When authorization is needed for the calls to Oracle Content
   * - all image requests will be proxied through here regardless of server or client side rendering
   * - browser requests for content are proxied through here (server content requests will never be
   *   proxied)
   * - this server will pass on the call to Oracle Content adding on the authorization headers and
   *   returning the Oracle Content response.
   * This ensures the browser will never have the authorization header visible in its requests.
   *
   * See the following files where proxying is setup
   * - 'src/scripts/server-config-utils.getClient' for the code proxying requests for content
   * - 'src/scripts/utils.getImageUrl' for the code proxying requests for image binaries
   */
  server.use('/content/', (req, res) => {
    if (isAuthNeeded()) {
      getAuthValue().then((authValue) => {
        handleContentRequest(req, res, authValue);
      });
    } else {
      handleContentRequest(req, res, '');
    }
  });

  // Serve static files from the dist folder
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y',
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req });
  });

  return server;
}

function run() {
  const port = process.env.PORT || 8080;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Application is accesssible on : http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
