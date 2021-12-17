/**
 * Copyright (c) 2021, Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
 */

import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { fetchArticleDetails } from '../scripts/services';

/**
 * Gets all the data required for the Image Grid Page.
 */
@Injectable()
export class ArticleDetailsDataResolver implements Resolve<any> {
  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private transferState: TransferState,
  ) {}

  /**
   * Gets all the data required to render the current route.
   *
   * If the transfer state already has the data then the data is returned from the transfer state.
   * Otherwise a call to Oracle Content is made to get the data.
   *
   * The transfer state will already have data when hydrating the client when content was rendered
   * on the server.  The transfer state will not already have the data when rendering server side
   * or rendering client side after a client side navigation.
   *
   * @param route the current route
   */
  resolve(route: ActivatedRouteSnapshot) {
    const articleId = route.paramMap.get('articleId');
    const DATA_KEY = makeStateKey(`ARTICLE${articleId}`);
    if (this.transferState.hasKey(DATA_KEY)) {
      // client is hydrating, server rendered content has
      // already added the data to the transfer state
      const data = this.transferState.get(DATA_KEY, null);
      this.transferState.remove(DATA_KEY);
      return data;
    }
    // server side rendering or client side rendering on client side navigation,
    // there is no transfer state therefore get the data from Oracle Content
    return fetchArticleDetails(articleId)
      .then((data) => {
        if (isPlatformServer(this.platformId)) {
          this.transferState.set(DATA_KEY, data);
        }
        return data;
      });
  }
}
