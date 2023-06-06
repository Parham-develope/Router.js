/**
 * @license
 * Router.js 1.0.0
 * @see https://github.com/ParhamTheDeveloper/Router.js
 *
 * Copyright (c) 2023
 * Licensed under the MIT license.
 */

import RouteFetchHandler from "./RouteFetchController";

class RouteContext {
  /** @type {RouteFetchHandler} */
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
