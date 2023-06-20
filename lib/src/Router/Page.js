/**
 * @license
 * ptd-routerjs 1.0.7
 * @see https://github.com/ParhamTheDeveloper/ptd-routerjs
 *
 * Copyright (c) 2023
 * Licensed under the MIT license.
 */

import PageControl from "./PageControl";

class Page {
  /** @type {string} route */
  path;

  /** @type {string} route */
  view;

  /** @type {string} */
  title;

  /** @type {PageControl} */
  control;

  /**
   *
   * @param {string} path
   * @param {string} view
   * @param {string} title
   * @param {PageControl} control
   */
  constructor(path = null, view = null, title = null, control = null) {
    // Set the path, view, title, and lifecycle properties if they are all valid
    if (control instanceof PageControl || control === null) {
      this.path = path;
      this.view = view;
      this.title = title;
      this.control = control;
    }
  }

  /**
   * Creates and returns a new Page with the given page object like { path: "/", ... }
   *
   * @param {Page} page
   * @returns {Page}
   */
  static create(page) {
    return new Page(page.path, page.view, page.title, page.control);
  }
}

export default Page;
