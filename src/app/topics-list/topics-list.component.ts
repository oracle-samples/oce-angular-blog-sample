/**
 * Copyright (c) 2021, Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ImageRenditions, Topic } from '../../interfaces/interfaces';

/**
 * Component representing a list of Topics with a header area
 * containing company logo, company name, Contact Us and About Us Links.
 */
@Component({
  selector: 'app-topics-list',
  templateUrl: './topics-list.component.html',
})
export class TopicsListComponent implements OnInit {
  loading = true;

  error = false;

  // variables whoses values are set in ngOnInit from data returned
  // from the server and are referenced from the html file
  companyTitle: string;

  aboutUrl: string;

  contactUrl: string;

  companyThumbnailRenditionUrls: ImageRenditions;

  topics: Topic[];

  /*
   * Set the title in the constructor.
   */
  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
  ) {
    this.titleService.setTitle('Topics');
  }

  /*
   * Get the data from the route, the data was obtained
   * using a resolver before this component was created
   */
  ngOnInit() {
    const data = this.route.snapshot.data.routeData;
    this.companyTitle = data.companyTitle;
    this.aboutUrl = data.aboutUrl;
    this.contactUrl = data.contactUrl;
    this.companyThumbnailRenditionUrls = data.companyThumbnailRenditionUrls;
    this.topics = data.topics;
    this.loading = false;
  }
}
