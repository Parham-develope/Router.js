/**
 * @license
 * Router.js 1.0.0
 * @see https://github.com/ParhamTheDeveloper/Router.js
 *
 * Copyright (c) 2023
 * Licensed under the MIT license.
 */

import RouteLifeCycle from "./RouteLifeCycle";

class Route {
  /** @type {string} route */
  path;

  /** @type {string} route */
  view;

  /** @type {string} */
  title;

  /** @type {RouteLifeCycle} */
  lifeCycle;

  /**
   *
   * @param {string} path
   * @param {string} view
   * @param {string} title
   * @param {LifeCycle} lifeCycle
   */
  constructor(path = null, view = null, title = null, lifeCycle = null) {
    // Set the path, view, title, and lifecycle properties if they are all valid
    if (
      typeof path === "string" &&
      typeof view === "string" &&
      typeof title === "string" &&
      lifeCycle instanceof LifeCycle
    ) {
      this.path = path;
      this.view = view;
      this.title = title;
      this.lifeCycle = lifeCycle;
    }
  }
}

export default Route;
