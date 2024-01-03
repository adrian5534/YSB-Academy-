"use strict";

var cartIcon = document.querySelector('#cart-icon');
var cart = document.querySelector('.cart');
var closeCart = document.querySelector('#close-cart');
var cartContent = document.querySelector('.cart-content'); // Move the declaration and assignment of 'cartContent' above the 'addProductToCart' function
var titleElement = document.querySelector('.product-title');
var priceElement = document.querySelector('.price');
var quantityElement = document.querySelector('.quantity');
var productImgElement = document.querySelector('.product-img');
var item = {
  title: titleElement ? titleElement.innerText : "",
  price: priceElement ? priceElement.innerText : "",
  quantity: quantityElement ? quantityElement.value : "",
  productImg: productImgElement ? productImgElement.src : ""
};

// Open Cart
cartIcon.onclick = function () {
  cart.classList.add("active");
};

// Close Cart
closeCart.onclick = function () {
  cart.classList.remove("active");
};

// Cart Working JS
document.addEventListener("DOMContentLoaded", ready);

// Making Function
function ready() {
  // Retrieve saved cart items from localStorage
  var savedCartItems = localStorage.getItem("cartItems");
  if (savedCartItems) {
    var cartItems = JSON.parse(savedCartItems);
    // Clear the cart content before adding items
    cartContent.innerHTML = '';
    for (var i = 0; i < cartItems.length; i++) {
      var _item = cartItems[i];
      // Create a new div for each item
      var itemDiv = document.createElement('div');
      // Set the innerHTML of the div to display the item's image, name, and price
      itemDiv.innerHTML = "\n      <img src=\"".concat(_item.productImg, "\" alt=\"").concat(_item.name, "\">\n      <h2>").concat(_item.name, "</h2>\n      <p>").concat(_item.price, "</p>\n");
      // Append the item div to the cart content
      cartContent.appendChild(itemDiv);
    }
    updateTotal();
    restoreCartItems();
  }

  // Remove Items From Cart
  cartContent.addEventListener('click', function (event) {
    if (event.target.classList.contains('cart-remove')) {
      var buttonClicked = event.target;
      buttonClicked.parentElement.remove();
      updateTotal();
      saveCartItems();
    }
  });
}

// Save Cart Items
function saveCartItems() {
  var cartItems = [];
  var cartBoxes = document.querySelectorAll(".cart-box");
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var _titleElement = cartBox.querySelector(".cart-product-title");
    var _priceElement = cartBox.querySelector(".cart-price");
    var _productImgElement = cartBox.querySelector(".cart-img");
    var _quantityElement = cartBox.querySelector(".cart-quantity");
    if (_titleElement && _priceElement && _productImgElement && _quantityElement) {
      var title = _titleElement.innerText;
      var price = _priceElement.innerText;
      var productImg = _productImgElement.src;
      var quantity = _quantityElement.value;
      cartItems.push({
        title: title,
        price: price,
        productImg: productImg,
        quantity: quantity
      });
    }
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  updateTotal(); // Update the total after saving the items
}
// Add Product To Cart
function addProductToCart(title, price, productImg, quantity) {
  var cartContent = document.querySelector(".cart-content");
  if (cartContent) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    // Set the data-title attribute
    cartShopBox.dataset.title = title;
    var cartBoxContent = "\n      <img src=\"".concat(productImg, "\" alt=\"\" class=\"cart-img\">\n      <div class=\"detail-box\">\n        <div class=\"cart-product-title\">").concat(title, "</div>\n        <div class=\"cart-price\">").concat(price, "</div>\n        <input type=\"number\" value=\"").concat(quantity, "\" class=\"cart-quantity\">\n      </div>\n      <i class='bx bxs-trash-alt cart-remove'></i>\n    ");
    cartShopBox.innerHTML = cartBoxContent;
    cartContent.appendChild(cartShopBox);
    var _quantityElement2 = cartShopBox.querySelector(".cart-quantity");
    _quantityElement2.addEventListener('change', function (event) {
      var newQuantity = parseInt(event.target.value);
      updateCartItemQuantity(cartShopBox, newQuantity);
      saveCartItems();
      updateTotal();
    });
  }
  saveCartItems();
  updateTotal();
  updateCartCount(); // Update the cart count after adding an item to the cart
}

// Update Cart Item Quantity
function updateCartItemQuantity(cartShopBox, newQuantity) {
  var quantityElement = cartShopBox.querySelector(".cart-quantity");
  if (quantityElement) {
    quantityElement.value = newQuantity;
  }
}

// Get all add-cart icons and attach event listeners
var shopProducts = document.querySelectorAll('.add-cart');
shopProducts.forEach(function (button) {
  button.addEventListener('click', function (event) {
    var product = event.target.parentElement;
    var title = product.querySelector('.product-title').innerText;
    var price = product.querySelector('.price').innerText;
    var productImg = product.querySelector('.product-img').src;
    addProductToCart(title, price, productImg, 1);
  });
});

// Update Cart Count
function updateCartCount() {
  var cartBoxes = document.querySelectorAll(".cart-box");
  var cartCount = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var _quantityElement3 = cartBoxes[i].querySelector(".cart-quantity");
    if (_quantityElement3) {
      cartCount += parseInt(_quantityElement3.value);
    }
  }
  var cartIcon = document.querySelector("#cart-icon");
  if (cartIcon) {
    cartIcon.setAttribute("data-quantity", cartCount);
  }
}

// Update Total
function updateTotal() {
  var cartBoxes = document.querySelectorAll('.cart-box');
  var total = 0;
  cartBoxes.forEach(function (cartBox) {
    var priceElement = cartBox.querySelector('.cart-price');
    var quantityElement = cartBox.querySelector('.cart-quantity');
    if (priceElement && quantityElement) {
      var price = parseFloat(priceElement.innerText.replace("$", ""));
      if (!isNaN(price)) {
        // Check if the price is a valid number
        var quantity = parseFloat(quantityElement.value);
        total += price * quantity;
      }
    }
  });
  total = Math.round(total * 100) / 100;
  document.querySelector(".total-price").innerText = "$" + total;
  // Save Total to LocalStorage
  localStorage.setItem("cartTotal", total);
  updateCartCount(); // Update the cart count after updating the total
}

// Keep Item in cart when page refresh with LocalStoragefunction restoreCartItems() {
function restoreCartItems() {
  var cartContent = document.querySelector(".cart-content");
  if (cartContent) {
    // Clear existing items in the cart
    cartContent.innerHTML = '';
  }
  var savedCartItems = localStorage.getItem("cartItems");
  if (savedCartItems) {
    var cartItems = JSON.parse(savedCartItems);
    for (var i = 0; i < cartItems.length; i++) {
      var _item2 = cartItems[i];
      var title = _item2.title;
      var price = _item2.price;
      var productImg = _item2.productImg;
      var quantity = _item2.quantity;
      addProductToCart(title, price, productImg, quantity);
    }
    updateTotal(); // Update the total after restoring the items
    updateCartCount(); // Update the cart count after restoring the items
  }
}

// No more editing below this line