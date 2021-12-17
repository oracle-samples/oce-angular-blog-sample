/**
 * Copyright (c) 2021, Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
 */

/**
 * This file contains the definitions of all the data used in this application
 */

interface IdItem {
  id: string;
}

export interface ImageRenditions {
  srcset: string;
  jpgSrcset: string;
  thumbnail: string;
  small: string;
  medium: string;
  large: string;
  native: string;
  width: string;
  height: string;
}

// -- ARTICLES --

// Note: attribute "fields" have "any" type, this is because the content server json object
// returned has field names with underscore in the name which the linter does not like,
// also it is unknown what all the fields are returned in the server calls.
export interface Article {
  id: string;
  name: string;
  description: string;
  fields: any;
  renditionUrls: ImageRenditions;
}

// -- TOPICS --

interface TopicFields {
  thumbnail: IdItem;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  fields: TopicFields;
  renditionUrls: ImageRenditions;
}

// -- PROXY SERVER --

// Note: the headers are optional in the HttpOptions
export interface HttpOptions {
  headers?: {} ;
}
