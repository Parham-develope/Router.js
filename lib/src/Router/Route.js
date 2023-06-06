/**
 * @license
 * Router.js 1.0.0
 * @see https://example.com/my-library
 *
 * Copyright (c) 2023
 * Licensed under the MIT license.
 */

import LifeCycle from "./LifeCycle";

class Route {
  /** @type {string} route */
  path;

  /** @type {string} route */
  view;

  /** @type {string} */
  title;

  /** @type {LifeCycle} */
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
