"use strict";

// Get all add-cart icons and attach event listeners
//var addCartIcons = document.querySelectorAll('.add-cart');
//addCartIcons.forEach(function(icon) {
// icon.addEventListener('click', addCartClicked);
//});

var items = [{
  name: 'Forex Basic 1',
  price: '$50'
}, {
  name: 'Forex Basic 2',
  price: '$150'
}
// Add more items as needed
];
var payBtn = document.querySelector(".btn-buy");
payBtn.addEventListener("click", function () {
  fetch("/stripe-checkout", {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      items: JSON.parse(localStorage.getItem("cartItems"))
    })
  }).then(function (res) {
    return res.json();
  }).then(function (url) {
    location.href = url;
  })["catch"](function (err) {
    return console.log(err);
  });
});