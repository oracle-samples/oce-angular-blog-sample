/**
 * Copyright (c) 2021, Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
 */

/*
 * MAIN entry point into this Application for client side rendering.
 *
 * "angular.json" is a JSON file that defines the settings for this application,
 * in that file,  under "projects> architect > build > options" there are the
 * following two settings
 *    "index": "src/index.html",
 *    "main": "src/main.ts",
 *
 * This tells Angular that the HTML page for this application is "index.html"
 * (our app code will add HTML into this page).
 *
 * It also tells us that "main.ts" (this file) is the starting Angular/TypeScript/JavaScript
 * file to execute. This file loads up the "./app/app.module" module which in turn loads
 * the component "app.component"
 */

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppModule)
    // eslint-disable-next-line no-console
    .catch((err) => console.error(err));
});
