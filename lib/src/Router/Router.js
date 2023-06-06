/**
 * @license
 * Router.js 1.0.0
 * @see https://example.com/my-library
 *
 * Copyright (c) 2023
 * Licensed under the MIT license.
 */

import Route from "./Route";
import RouteFetchController from "./RouteFetchController";
import RouteContext from "./RouteContext";
import RouterUrl from "./RouterUrl";

class Router {
  /** @type {Route[]} routes */
  #routes;

  /** @type {HTMLElement} */
  #target;

  /** @type {HTMLDivElement} */
  #lastRenderedWrapper;

  /** @type {Route} */
  #previousRoute;

  /** @type {RouteFetchController} */
  #controller;

  /**
   * Used to reference the shared state between lifeCycle methods
   * @type {any}
   */
  state;

  /**
   * Shared context between lifeCycle methods
   * @type {RouteContext}
   */
  #routeCtx;

  /**
   *
   * @param {HTMLElement} targetElement
   */
  constructor(targetElement) {
    // Set up the default route and add a popstate event listener
    
    // the default route 
    this.#routes = [
      {
        path: "/*",
        view: "",
      },
    ];
    
    this.#target = targetElement;
    this.state = null;

    // Create the controller for aborting the request in the lifeCycle members
    this.#controller = new RouteFetchController();
    
    window.addEventListener("popstate", this.#renderView.bind(this));
  }

  // Getters and Setters

  get controller() {
    return this.#controller;
  }

  // Public methods

  /**
   *
   * @param {Route} route
   */
  addRoute(route) {
    // Add the route to the routes array if it has a valid path and view
    if (typeof route.path === "string" && typeof route.view === "string") {
      if (route.path === "/*") {
        this.#routes[0] = route;
      } else {
        this.#routes.push(route);
      }
    }
  }

  handleRoutes() {
    window.addEventListener("DOMContentLoaded", this.#renderView.bind(this));
  }

  // Private methods

  async #renderView() {
    // Make sure the routes array exists before rendering
    if (!this.#routes) {
      return;
    }

    this.#routeCtx = new RouteContext(this);
    const routeCtx = this.#routeCtx;

    // Find the current route based on the current URL path
    const currentPath = window.location.pathname;
    const allRoutes = this.#routes.find((route) => route.path === "/*");
    const currentRoute =
      this.#routes.find((route) => route.path === currentPath) || allRoutes;

    // Remove the last rendered wrapper to prepare for the new view
    if (this.#lastRenderedWrapper) {
      if (
        this.#previousRoute &&
        this.#previousRoute?.lifeCycle?.onunmount &&
        typeof this.#previousRoute.lifeCycle.onunmount === "function"
      ) {
        // Cancel the on going request automatically and then call the onunmount
        this.#controller.cancelRequest();
        this.#previousRoute.lifeCycle.onunmount(routeCtx);
      }
      this.#lastRenderedWrapper.remove();
    }

    // Generate a class name for the wrapper element based on the route path
    const className = `${this.#getPathWithoutTrailingSlash(
      currentRoute
    )}-route`;

    // Create a new wrapper element and attach it to the target element
    const wrapper = document.createElement("div");
    wrapper.classList.add(className);
    wrapper.innerHTML = currentRoute.view;

    // Call the onmount and ondidmount lifecycle methods for the current route
    if (
      currentRoute?.lifeCycle?.onmount &&
      typeof currentRoute.lifeCycle.onmount === "function"
    ) {
      currentRoute.lifeCycle.onmount(routeCtx);
    }
    RouterUrl.setRouteTitle(currentRoute.title);

    if (!this.#target.contains(wrapper)) {
      this.#target.appendChild(wrapper);
    }

    if (
      currentRoute?.lifeCycle?.ondidmount &&
      typeof currentRoute.lifeCycle.ondidmount === "function"
    ) {
      currentRoute.lifeCycle.ondidmount(routeCtx);
    }

    // Keep track of the previous and last rendered wrapper for removal in the next render
    this.#keepTrackOfLastRenderedRoute(currentRoute, wrapper);
  }

  /**
   *
   * @param {Route} route
   * @returns {string}
   */
  #getPathWithoutTrailingSlash(route) {
    let pathWithoutLeadingSlash = route.path.replace("/", "");
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
   * 
   * @param {Route} route 
   * @param {HTMLElement} wrapperElement 
   */
  #keepTrackOfLastRenderedRoute(route, wrapperElement) {
    this.#previousRoute = route;
    this.#lastRenderedWrapper = wrapperElement;
  }
}

export default Router;
