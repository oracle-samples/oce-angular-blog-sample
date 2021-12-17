/**
 * Copyright (c) 2021, Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
 */

import { Component, Input } from '@angular/core';

import { Topic } from '../../interfaces/interfaces';

/**
 * Component representing a Topic displayed in a list of topics.
 *
 * @param topicId The ID of the Topic, used to render links to child views
 */
@Component({
  selector: 'app-topic-list-item',
  templateUrl: './topic-list-item.component.html',
})
export class TopicListItemComponent {
  // variables passed into this component from another component
  // (note: these could also be referenced in the HTML)
  @Input() topic: Topic;
}
