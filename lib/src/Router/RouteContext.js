/**
 * @license
 * ptd-routerjs 1.0.7
 * @see https://github.com/ParhamTheDeveloper/ptd-routerjs
 *
 * Copyright (c) 2023
 * Licensed under the MIT license.
 */

import RouteDataProvider from "./RouteDataProvider";

class RouteContext {
  /** @type {RouteDataProvider} */
  controller;

  /** @type {Router} */
  self;

  /**
   *
   * @param {Router} router
   */
  constructor(router) {
    this.controller = router.controller;
    this.self = router;
  }
}

export default RouteContext;
