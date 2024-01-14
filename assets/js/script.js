'use strict';

// This code should be in your frontend JavaScript file
const createCheckoutSession = async (items) => {
  const response = await fetch('http://localhost:3000/stripe-checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ items }),
  });
  const sessionUrl = await response.json();
  return sessionUrl;
};

// Replace 'items' with your actual items
const items = [

  {
    name: 'Forex Basic 1',
    price: '$50'
  },
  {
    name: 'Forex Basic 2',
    price: '$150'
  },

  // Add more items as needed
  

]; 

const createSessionAndRedirect = async () => {
  const sessionUrl = await createCheckoutSession(items);
  window.location.href = sessionUrl;
};

createSessionAndRedirect();

/**
 * add event on element
 */

const addEventOnElem = function(elem, type, callback) {
  if (elem instanceof NodeList || elem instanceof HTMLCollection) {
    elem.forEach(function(el) {
      el.addEventListener(type, callback);
    });
  } else {
    elem.addEventListener(type, callback);
  }
};



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navLinks, "click", closeNavbar);



/**
 * header active when scroll down to 100px
 */

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");
  const backTopBtn = document.querySelector(".back-top-btn");

  const activeElem = function () {
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

