/**
 * @license
 * Router.js 1.0.0
 * @see https://github.com/ParhamTheDeveloper/Router.js
 *
 * Copyright (c) 2023
 * Licensed under the MIT license.
 */

class Renderer {
  /** @type {HTMLElement} */
  #target;

  /** @type {HTMLElement[]} */
  #renderedComponents;

  /** @type {HTMLElement[]} */
  #unrenderedComponents;

  /**
   *
   * @param {HTMLElement} target
   */
  constructor(target) {
    this.#target = target;
    this.#renderedComponents = [];
    this.#unrenderedComponents = [];
  }

  // Getters

  get renderedComponents() {
    return this.#renderedComponents;
  }

  get unrenderedComponents() {
    return this.#unrenderedComponents;
  }

  // Public methods

  /**
   * Renders a component in the given target element
   * @param {HTMLElement | string} component
   */
  render(component) {
    Renderer.render(this.#target, component);
    this.#renderedComponents.push(Renderer.toElement(component));
  }

  /**
   * Renders a component in the given target element
   * @param {HTMLElement} component
   */
  unrender(component) {
    Renderer.unrender(component);
    this.#unrenderedComponents.push(Renderer.toElement(component));
  }

  // Static methods

  /**
   *
   * @param {HTMLElement | string} target
   * @param {HTMLElement | string} component
   */
  static render(target, component) {
    if (target instanceof HTMLElement && typeof component === "string") {
      target.innerHTML += component;
    } else if (
      target instanceof HTMLElement &&
      component instanceof HTMLElement
    ) {
      target.appendChild(component);
    }
  }

  /**
   *
   * @param {string} htmlString
   */
  static toElement(htmlString) {
    if (typeof htmlString === "string") {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString);
      const element = doc.body.firstChild;
      return element;
    }
    return null;
  }

  /**
   *
   * @param {HTMLElement | string} target
   * @param {HTMLElement | string} component
   */
  static unrender(component) {
    if (component instanceof HTMLElement) {
      component.remove();
    }
  }
}

export default Renderer;
