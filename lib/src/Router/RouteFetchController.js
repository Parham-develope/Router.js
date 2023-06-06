/**
 * @license
 * Router.js 1.0.0
 * @see https://example.com/my-library
 *
 * Copyright (c) 2023
 * Licensed under the MIT license.
 */

class RouteFetchController {
  /** @type {AbortController} */
  #controller;

  /** @type {() => void} */
  onCancelRequest;

  constructor() {
    this.#controller = new AbortController();
  }

  /**
   *
   * @param {RequestInfo | URL} url
   * @param {RequestInit} options
   */
  async fetch(url, options) {
    try {
      const { signal } = this.#controller;
      const response = await fetch(url, {
        ...options,
        signal,
      });
      return response;
    } catch (error) {
      // skip the error handling and call the onCancelRequest
      if (this.onCancelRequest && typeof this.onCancelRequest === "function") {
        this.onCancelRequest();
      }
    }
  }

  cancelRequest() {
    this.#controller.abort();

    // Creating a new instance of AbortController just in case if the user did more fetching
    this.#controller = new AbortController();
  }
}

export default RouteFetchController;
