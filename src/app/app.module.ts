/**
 * Copyright (c) 2021, Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
 */

import { BrowserModule, Title, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TopicsListComponent } from './topics-list/topics-list.component';
import { TopicListItemComponent } from './topic-list-item/topic-list-item.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticleListItemComponent } from './article-list-item/article-list-item.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { TopicsListDataResolver } from '../resolvers/topics-list-data.resolver';
import { ArticlesListDataResolver } from '../resolvers/articles-list-data.resolver';
import { ArticleDetailsDataResolver } from '../resolvers/article-details-data.resolver';

const appRoutes: Routes = [
  // home page - list of Topics
  {
    path: 'topics',
    component: TopicsListComponent,
    resolve: { routeData: TopicsListDataResolver },
  },
  // list of articles for a specific Topic
  {
    path: 'articles/:topicId',
    component: ArticlesListComponent,
    resolve: { routeData: ArticlesListDataResolver },
  },
  // details for a specific Article
  {
    path: 'article/:articleId',
    component: ArticleDetailsComponent,
    resolve: { routeData: ArticleDetailsDataResolver },
  },
  // no path specified, go to home
  {
    path: '', redirectTo: '/topics', pathMatch: 'full',
  },
  // path not found
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TopicsListComponent,
    TopicListItemComponent,
    ArticlesListComponent,
    ArticleListItemComponent,
    ArticleDetailsComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false, initialNavigation: 'enabled' }), // <-- debugging purposes only
  ],
  providers: [
    Title,
    TopicsListDataResolver,
    ArticlesListDataResolver,
    ArticleDetailsDataResolver,
  ],
  bootstrap: [
    AppComponent,
  ],
})

export class AppModule { }
