/**
 * Copyright (c) 2021, Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
 */

import { Component, Input, OnInit } from '@angular/core';

import { Article, ImageRenditions } from '../../interfaces/interfaces';
import { dateToMDY } from '../../scripts/utils';

/**
 * Component representing an Article displayed in a list of articles.
 *
 * @param topicId The Topic to which the Article belongs, used when creating
 *                the link to the article details
 * @param topicName The Topic name, used to render breadcrumbs
 * @param article The Article to display
 */
@Component({
  selector: 'app-article-list-item',
  templateUrl: './article-list-item.component.html',
})
export class ArticleListItemComponent implements OnInit {
  dataLoaded = false;

  // variables passed into this component from another component
  // (note: these could also be referenced in the HTML)
  @Input() article: Article;

  @Input() topicId: string;

  @Input() topicName: string;

  // variables whoses values are set in ngOnInit from data returned
  // from the server and are referenced from the html file
  articleId: string;

  renditionUrls: ImageRenditions;

  name: string;

  description: string;

  formattedDate: string;

  /*
   * Get the data from the server and populate above variables
   */
  ngOnInit() {
    this.name = this.article.name;
    this.description = this.article.description;
    this.articleId = this.article.id;

    // Format the date into a readable string
    this.formattedDate = `Posted on ${dateToMDY(this.article.fields.published_date.value)}`;
    this.renditionUrls = this.article.renditionUrls;
  }
}
