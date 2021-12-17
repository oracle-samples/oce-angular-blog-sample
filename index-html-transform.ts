/**
 * Copyright (c) 2021, Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import { TargetOptions } from '@angular-builders/custom-webpack';
import { version as sdkVersion } from './node_modules/@oracle/content-management-sdk/package.json';

export default (targetOptions: TargetOptions, indexHtml: string) => {
  const generatedIndex = indexHtml
    .replace('%BUILD_TAG%', process.env.BUILD_TAG)
    .replace('%SDK_VERSION%', sdkVersion);

  return generatedIndex;
};
