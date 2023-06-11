/**
 * @license
 * Router.js 1.0.0
 * @see https://github.com/ParhamTheDeveloper/Router.js
 *
 * Copyright (c) 2023
 * Licensed under the MIT license.
 */

import RouterUrl from "../Router/RouterUrl";

class Navlink {
  /** @type {HTMLAnchorElement} */
  #element;
  /** @type {string} */
  #to;
  /**  @type {string} */
  #activeClassname;
  /** @type {(this: Navlink) => void} */
  #onRouteChangeCallback;

  constructor({ to, children, activeClassname }) {
    this.#element = document.createElement("a");
    this.#element.href = to;
    this.#element.innerHTML = children;
    this.#to = to;
    this.#activeClassname = activeClassname;
    this.#updateActiveState();
    this.#element.addEventListener("click", this.#handleClick.bind(this));
    window.addEventListener("popstate", this.#handlePopstate.bind(this));
  }

  get element() {
    return this.#element;
  }

  get isActive() {
    return window.location.pathname === this.#to;
  }

  /**
   *
   * @param {(this: Navlink) => void} callback
   */
  onRouteChange(callback) {
    this.#onRouteChangeCallback = callback;
    this.#updateActiveState();
  }

  /**
   *
   * @param {MouseEvent} e
   */
  #handleClick(e) {
    e.preventDefault();
    RouterUrl.navigate(this.#to);
  }

  #handlePopstate() {
    this.#updateActiveState();
  }

  #updateActiveState = () => {
    const currentPathname = window.location.pathname;
    const isActive = currentPathname === this.#to;
    this.#element.classList.toggle(this.#activeClassname, isActive);
    if (this.#onRouteChangeCallback) {
      this.#onRouteChangeCallback(this);
    }
  };
}

export default Navlink;
