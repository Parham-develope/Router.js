/**
 * @license
 * Router.js 1.0.0
 * @see https://github.com/ParhamTheDeveloper/Router.js
 *
 * Copyright (c) 2023
 * Licensed under the MIT license.
 */

class RouterUrl {
  /**
   * Sets the title of the document
   * @param {string} title
   */
  static setRouteTitle(title) {
    document.title = title || document.title;
  }

  /**
   *
   * @param {string} to
   */
  static navigate = (to) => {
    // Update the URL and trigger a popstate event
    const targetUrl = to;
    if (targetUrl !== window.location.href) {
      window.history.pushState(window.history.state, null, to);
      RouterUrl.sendRouteChangeEvent();
    }
  };

  static sendRouteChangeEvent = () => {
    // Create and dispatch a popstate event
    const event = new PopStateEvent("popstate");
    window.dispatchEvent(event);
  };

  /**
   *
   * @param {string} queryName
   * @returns {string | null}
   */
  static getQueryFromUrl(queryName) {
    const queryString = window.location.search;

    // Parse the query string into an object
    const queryParams = new URLSearchParams(queryString);

    // Get the value of a specific query parameter
    const query = queryParams.get(queryName);
    return query;
  }

  /**
   *
   * @param {string} paramName
   * @returns {Object}
   */
  static getParamFromUrl(paramName) {
    // Get the current URL
    const url = window.location.href;

    // Extract the value of the parameter from the URL
    const parts = url.split("/");
    const index = parts.indexOf(paramName);
    if (index !== -1) {
      // Create an object with the parameter name and value
      const result = {};
      result[paramName] = parts[index + 1];
      return result;
    } else {
      return null;
    }
  }
}

export default RouterUrl;
