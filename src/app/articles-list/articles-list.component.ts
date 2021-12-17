/**
 * Copyright (c) 2021, Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Article } from '../../interfaces/interfaces';
import {
  PAGE_PARAM_TOPIC_ID,
  PAGE_PARAM_TOPIC_NAME,
} from '../../constants/params';

/**
 * Component representing a list of Articles with a breadcrumb bar
 * at the top.
 *
 * @param topicId the ID of the topic
 * @param topicName the name of the topic, used when rendering breadcrumbs
 */
@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
})
export class ArticlesListComponent implements OnInit {
  loading = true;

  error = false;

  // variables obtained from the routed URL
  topicId: string;

  topicName: string;

  // variables whoses values are set in ngOnInit from data returned
  // from the server and are referenced from the html file
  articles: Article[];

  /*
   * Set the title in the constructor.
   */
  constructor(private route: ActivatedRoute, private titleService: Title) {
    this.titleService.setTitle('Articles');
  }

  /*
   * Get the data from the route, the data was obtained
   * using a resolver before this component was created
   */
  ngOnInit() {
    const data = this.route.snapshot.data.routeData;
    this.topicId = this.route.snapshot.params[PAGE_PARAM_TOPIC_ID];
    this.topicName = this.route.snapshot.queryParams[PAGE_PARAM_TOPIC_NAME];
    this.articles = data.articles;
    this.loading = false;
  }
}
