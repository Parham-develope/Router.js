/**
 * @license
 * Router.js 1.0.0
 * @see https://github.com/ParhamTheDeveloper/Router.js
 *
 * Copyright (c) 2023
 * Licensed under the MIT license.
 */

class Renderer {
  /**
   *
   * @param {HTMLElement | string} target
   * @param {HTMLElement | string} component
   */
  static render(target, component) {
    if (typeof target === "string") {
      const parser = new DOMParser();
      const doc = parser.parseFromString(target);
      const targetElement = doc.body.firstChild;
      if (typeof component === "string") {
        targetElement.innerHTML += component;
      } else {
        targetElement.appendChild(component);
      }
    }
    if (typeof component === "string") {
      target.innerHTML += component;
    } else {
      target.appendChild(component);
    }
  }

  /**
   * 
   * @param {string} htmlString 
   */
  static toElement(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString);
    const element = doc.body.firstChild;
    return element;
  }

  /**
   *
   * @param {HTMLElement | string} target
   * @param {HTMLElement | string} component
   */
  static unrender(target, component) {
    if (component instanceof HTMLElement) {
      target.removeChild(component);
    }
  }
}

export default Renderer;
