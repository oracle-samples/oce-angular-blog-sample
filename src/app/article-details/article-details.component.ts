/**
 * Copyright (c) 2021, Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filterXSS } from 'xss';
import { ImageRenditions } from '../../interfaces/interfaces';
import {
  PAGE_PARAM_TOPIC_ID,
  PAGE_PARAM_TOPIC_NAME,
  PAGE_PARAM_TOPIC_ARTICLE_ID,
} from '../../constants/params';
import { dateToMDY } from '../../scripts/utils';

/**
 * Component representing Article details.
 *
 * @param articleId The id of the Article to display
 * @param topicId The id of the topic, used when rendering breadcrumbs
 * @param topicName The topic name, used when rendering breadcrumbs
 */
@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
})
export class ArticleDetailsComponent implements OnInit {
  loading = true;

  error = false;

  // variables obtained from the routed URL
  articleId: string;

  topicId: string;

  topicName: string;

  // variables whoses values are set in ngOnInit from data returned
  // from the server and are referenced from the html file
  articleName: string;

  authorName: string;

  imageCaption: string;

  articleContents: string;

  renditionUrls: ImageRenditions;

  authorRenditionUrls: ImageRenditions;

  formattedDate: string;

  /*
   * Set the title in the constructor.
   */
  constructor(private route: ActivatedRoute, private titleService: Title) {
    this.titleService.setTitle('Article');
  }

  /*
   * Get the data from the server and populate above variables
   */
  ngOnInit() {
    // get the values from the routed URL
    this.articleId = this.route.snapshot.params[PAGE_PARAM_TOPIC_ARTICLE_ID];
    this.topicId = this.route.snapshot.queryParams[PAGE_PARAM_TOPIC_ID];
    this.topicName = this.route.snapshot.queryParams[PAGE_PARAM_TOPIC_NAME];

    const data = this.route.snapshot.data.routeData;

    this.articleName = data.name;
    this.authorName = data.title;
    this.imageCaption = data.imageCaption;

    // sanitize the content for html display
    const { content } = data;
    const options = {
      stripIgnoreTag: true, // filter out all HTML not in the whitelist
      stripIgnoreTagBody: ['script'], // the script tag is a special case, we need
      // to filter out its content
    };
    this.articleContents = filterXSS(content, options);

    this.formattedDate = `Posted on ${dateToMDY(data.date.value)}`;
    this.authorRenditionUrls = data.authorRenditionUrls;
    this.renditionUrls = data.renditionUrls;
    this.loading = false;
  }
}
