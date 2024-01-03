'use strict';

/**
 * add event on element
 */
var addEventOnElem = function addEventOnElem(elem, type, callback) {
  if (elem instanceof NodeList || elem instanceof HTMLCollection) {
    elem.forEach(function (el) {
      el.addEventListener(type, callback);
    });
  } else {
    elem.addEventListener(type, callback);
  }
};

/**
 * navbar toggle
 */

var navbar = document.querySelector("[data-navbar]");
var navTogglers = document.querySelectorAll("[data-nav-toggler]");
var navLinks = document.querySelectorAll("[data-nav-link]");
var overlay = document.querySelector("[data-overlay]");
var toggleNavbar = function toggleNavbar() {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
};
addEventOnElem(navTogglers, "click", toggleNavbar);
var closeNavbar = function closeNavbar() {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
};
addEventOnElem(navLinks, "click", closeNavbar);

/**
 * header active when scroll down to 100px
 */

document.addEventListener("DOMContentLoaded", function () {
  var header = document.querySelector(".header");
  var backTopBtn = document.querySelector(".back-top-btn");
  var activeElem = function activeElem() {
    if (window.scrollY > 100) {
      header.classList.add("active");
      backTopBtn.classList.add("active");
    } else {
      header.classList.remove("active");
      backTopBtn.classList.remove("active");
    }
  };
  window.addEventListener("scroll", activeElem);
});