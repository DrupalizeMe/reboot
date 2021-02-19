/**
 * @file
 * Example Typescript file.
 */

// This is required for HMR with Parcel to work correctly. It will be stripped
// out for production builds.
// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept();
}

import Greeter from './greeting';

let greeter = new Greeter("Drupal");

console.log(greeter.greet());
