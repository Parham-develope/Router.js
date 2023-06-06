/**
 * @license
 * Router.js 1.0.0
 * @see https://example.com/my-library
 *
 * Copyright (c) 2023
 * Licensed under the MIT license.
 */

class LifeCycle {
  /** @type {() => Promise<any>} */
  onmount;

  /** @type {() => Promise<any>} */
  ondidmount;

  /** @type {() => Promise<any>} */
  onunmount;

  /**
   *
   * @param {() => Promise<any>} mount
   * @param {() => Promise<any>} didmount
   * @param {() => Promise<any>} unmount
   */
  constructor(
    mountCallback = null,
    didmountCallback = null,
    unmountCallback = null
  ) {
    // Set default values for onmount, ondidmount, and onunmount if they are not provided
    const emptyPromise = new Promise((res, rej) => {});
    // Set the onmount, ondidmount and onunmount properties if they are all valid
    if (
      typeof mountCallback === "function" &&
      typeof didmountCallback === "function" &&
      typeof unmountCallback === "function"
    ) {
      this.onmount = mountCallback || emptyPromise;
      this.ondidmount = didmountCallback || emptyPromise;
      this.onunmount = unmountCallback || emptyPromise;
    }
  }
}

export default LifeCycle;