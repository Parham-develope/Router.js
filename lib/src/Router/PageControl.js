/**
 * @license
 * ptd-routerjs 1.0.7
 * @see https://github.com/ParhamTheDeveloper/ptd-routerjs
 *
 * Copyright (c) 2023
 * Licensed under the MIT license.
 */

class PageControl {
  /** @type {(ctx: RouteContext) => Promise<any>} */
  onmount;

  /** @type {(ctx: RouteContext) => Promise<any>} */
  ondidmount;

  /** @type {(ctx: RouteContext) => Promise<any>} */
  onunmount;

  /**
   *
   * @param {(ctx: RouteContext) => Promise<any>} mount
   * @param {(ctx: RouteContext) => Promise<any>} didmount
   * @param {(ctx: RouteContext) => Promise<any>} unmount
   */
  constructor(
    mountCallback = null,
    didmountCallback = null,
    unmountCallback = null
  ) {
    // Set default values for onmount, ondidmount, and onunmount if they are not provided

    const callbackFn = async (ctx) => {
      return null;
    };

    // Set the onmount, ondidmount and onunmount properties if they are all valid
    if (
      (typeof mountCallback === "function" || mountCallback === null) &&
      (typeof didmountCallback === "function" || didmountCallback === null) &&
      (typeof unmountCallback === "function" || unmountCallback === null)
    ) {
      this.onmount = mountCallback || callbackFn;
      this.ondidmount = didmountCallback || callbackFn;
      this.onunmount = unmountCallback || callbackFn;
    }
  }
}

export default PageControl;
