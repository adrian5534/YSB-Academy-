"use strict";

var items = document.querySelectorAll('.accordion button');
function toggleAccordion() {
  var itemToggle = this.getAttribute('aria-expanded');
  for (var i = 0; i < items.length; i++) {
    items[i].setAttribute('aria-expanded', 'false');
  }
  if (itemToggle == 'false') {
    this.setAttribute('aria-expanded', 'true');
  }
}
items.forEach(function (item) {
  return item.addEventListener('click', toggleAccordion);
});