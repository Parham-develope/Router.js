/**
 * @license
 * Router.js 1.0.0
 * @see https://github.com/ParhamTheDeveloper/Router.js
 *
 * Copyright (c) 2023
 * Licensed under the MIT license.
 */

import Page from "./Page";
import RouteDataProvider from "./RouteDataProvider";
import RouteContext from "./RouteContext";
import RouterUrl from "./RouterUrl";

class Router {
  /** @type {Page[]} routes */
  #pages;

  /** @type {HTMLElement} */
  #target;

  /** @type {HTMLDivElement} */
  #lastRenderedWrapper;

  /** @type {Page} */
  #previousPage;

  /** @type {RouteDataProvider} */
  #controller;

  /**
   * Used to reference the shared state between PageControl methods
   * 
   * @type {any}
   */
  state;

  /**
   * Shared context between PageControl methods
   * 
   * @type {RouteContext}
   */
  #routeCtx;

  /**
   * Set up the default page and add a popstate event listener
   * @param {HTMLElement} targetElement
   */
  constructor(targetElement) {
    // the default route
    this.#pages = [
      {
        path: "/*",
        view: "",
      },
    ];

    this.#target = targetElement;
    this.state = null;

    // Create the controller for aborting the request in the PageControl members
    this.#controller = new RouteDataProvider();

    window.addEventListener("popstate", (e) => {
      this.#renderView();
    });
  }

  // Getters and Setters

  get controller() {
    return this.#controller;
  }

  // Public methods

  /**
   * Adds a new page to the pages list, it simply adds another page
   * 
   * @param {Page} page
   */
  addPage(page) {
    // Add the page to the pages array if it has a valid path and view
    if (typeof page.path === "string" && typeof page.view === "string") {
      if (page.path === "/*") {
        this.#pages[0] = page;
      } else {
        this.#pages.push(page);
      }
    }
  }

  /**
   * Adds a new page to the pages list, it simply adds another page
   * 
   * @param {Page} page
   */
  route(page) {
    this.addPage(page);
  }

  /**
   * You must call this method to run the router
   */
  handleRoutes() {
    window.addEventListener("DOMContentLoaded", () => {
      // removing the trailing slash from the url before rendering the view
      RouterUrl.removeTrailingSlashFromUrl();

      // Finally rendering the view
      this.#renderView();
    });
  }

  // Private methods

  /**
   * Renders the current page's view
   */
  async #renderView() {
    // Make sure the routes array exists before rendering
    if (!this.#pages) {
      return;
    }

    this.#routeCtx = new RouteContext(this);
    const routeCtx = this.#routeCtx;

    // Find the current route based on the current URL path
    const currentPath = window.location.pathname;
    const allRoutes = this.#pages.find((route) => route.path === "/*");
    const currentPage =
      this.#pages.find((route) => route.path === currentPath) || allRoutes;

    // Remove the last rendered wrapper to prepare for the new view
    this.#callControlMethod(null, "unmount");

    // Generate a class name for the wrapper element based on the route path
    const className = `${this.#getPathWithoutTrailingSlash(currentPage)}-route`;

    // Create a new wrapper element and attach it to the target element
    const wrapper = document.createElement("div");
    wrapper.classList.add(className);
    wrapper.innerHTML = currentPage.view;

    // Call the onmount and ondidmount PageControl methods for the current route
    this.#callControlMethod(currentPage, "mount");
    RouterUrl.setPageTitle(currentPage.title);

    if (!this.#target.contains(wrapper)) {
      this.#target.appendChild(wrapper);
    }

    this.#callControlMethod(currentPage, "didmount");

    // Keep track of the previous and last rendered wrapper for removal in the next render
    this.#keepTrackOfLastRenderedPage(currentPage, wrapper);
  }

  /**
   *
   * @param {Page} page
   */
  #callControlMethod(page, method) {
    switch (method) {
      // calls the onmount method
      case "mount":
        {
          if (
            page?.control?.onmount &&
            typeof page.control.onmount === "function"
          ) {
            page.control.onmount(this.#routeCtx);
          }
        }
        break;

      // calls the ondidmount method
      case "didmount":
        {
          if (
            page?.control?.ondidmount &&
            typeof page.control.ondidmount === "function"
          ) {
            page.control.ondidmount(this.#routeCtx);
          }
        }
        break;

      // calls the onunmount method
      case "unmount":
        {
          if (this.#lastRenderedWrapper) {
            if (
              this.#previousPage &&
              this.#previousPage?.control?.onunmount &&
              typeof this.#previousPage.control.onunmount === "function"
            ) {
              // Cancel the on going request automatically and then call the onunmount
              this.#controller.cancelRequest();
              this.#previousPage.control.onunmount(this.#routeCtx);
            }
            this.#lastRenderedWrapper.remove();
          }
        }
        break;
    }
  }

  /**
   *
   * @param {Page} page
   * @returns {string}
   */
  #getPathWithoutTrailingSlash(page) {
    let pathWithoutLeadingSlash = page.path.replace("/", "");
    switch (pathWithoutLeadingSlash) {
      case "":
        pathWithoutLeadingSlash = "home";
        break;
      case "*":
        pathWithoutLeadingSlash = "all";
        break;
    }

    return pathWithoutLeadingSlash;
  }

  /**
   * keeps track of the last rendered page
   * 
   * @param {Page} page
   * @param {HTMLElement} wrapperElement
   */
  #keepTrackOfLastRenderedPage(page, wrapperElement) {
    this.#previousPage = page;
    this.#lastRenderedWrapper = wrapperElement;
  }
}

export default Router;
