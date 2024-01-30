"use strict";

var cartIcon = document.querySelector('#cart-icon');
var cart = document.querySelector('.cart');
var closeCart = document.querySelector('#close-cart');
var cartContent = document.querySelector('.cart-content'); // Move the declaration and assignment of 'cartContent' above the 'addProductToCart' function
var titleElement = document.querySelector('.cart-title');
var priceElement = document.querySelector('.cart-price');
var quantityElement = document.querySelector('.cart-quantity');
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

      // Set the innerHTML of the div to display the item's image, name, and price
      var itemDiv = document.createElement('div');
      itemDiv.innerHTML = "\n  <img src=\"".concat(_item.productImg, "\" alt=\"").concat(_item.name, "\">\n  <h2>").concat(_item.name, "</h2>\n  <p>").concat(_item.price, "</p>\n");
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

// Add Product To Cart
function addProductToCart(title, price, productImg, quantity) {
  var cartContent = document.querySelector(".cart-content");
  var cartItems = document.querySelectorAll('.detail-box'); // Assuming '.detail-box' is the class of each cart item
  if (cartContent) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    // Set the data-title attribute
    cartShopBox.dataset.title = title;
    var cartBoxContent = "\n      <img src=\"".concat(productImg, "\" alt=\"\" class=\"cart-img\">\n      <div class=\"detail-box\">\n        <div class=\"cart-product-title\">").concat(title, "</div>\n        <div class=\"cart-price\">").concat(price, "</div>\n        <input type=\"number\" value=\"").concat(quantity, "\" class=\"cart-quantity\">\n      </div>\n      <i class='bx bxs-trash-alt cart-remove'></i>\n    ");
    cartShopBox.innerHTML = cartBoxContent;
    cartContent.appendChild(cartShopBox);
    var _quantityElement = cartShopBox.querySelector(".cart-quantity");
    _quantityElement.addEventListener('change', function (event) {
      var newQuantity = parseInt(event.target.value);
      updateCartItemQuantity(cartShopBox, newQuantity);
      saveCartItems();
      updateTotal();
    });

    // Save the items and update the total and count after the item is fully added
    saveCartItems();
    updateTotal();
    updateCartCount();
  }
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
    var _quantityElement2 = cartBoxes[i].querySelector(".cart-quantity");
    if (_quantityElement2) {
      cartCount += parseInt(_quantityElement2.value);
    }
  }
  var cartIcon = document.querySelector("#cart-icon");
  if (cartIcon) {
    cartIcon.setAttribute("data-quantity", cartCount);
  }
}

// Update Total
function updateTotal() {
  var detailBoxes = document.querySelectorAll('.detail-box');
  var total = 0;
  detailBoxes.forEach(function (detailBox) {
    var priceElement = detailBox.querySelector('.cart-price');
    var quantityElement = detailBox.querySelector('.cart-quantity');
    if (priceElement && quantityElement) {
      var price = parseFloat(priceElement.innerText.replace("$", ""));
      if (!isNaN(price)) {
        var quantity = parseFloat(quantityElement.value);
        total += price * quantity;
      }
    }
  });
  total = Math.round(total * 100) / 100;
  document.querySelector(".total-price").innerText = "$" + total;
  localStorage.setItem("cartTotal", total);
  updateCartCount();
}

// Keep Item in cart when page refresh with LocalStorage
function restoreCartItems() {
  var cartContent = document.querySelector(".cart-content");
  if (cartContent) {
    cartContent.innerHTML = '';
  }
  var savedCartItems = localStorage.getItem("cartItems");
  if (savedCartItems) {
    var cartItems = JSON.parse(savedCartItems);
    for (var i = 0; i < cartItems.length; i++) {
      var _item2 = cartItems[i];
      addProductToCart(_item2.title, _item2.price, _item2.productImg, _item2.quantity);
    }
  }
}

// Save Cart Items
function saveCartItems() {
  var cartBoxes = document.querySelectorAll(".cart-box");
  var items = [];
  for (var i = 0; i < cartBoxes.length; i++) {
    var title = cartBoxes[i].dataset.title;
    var _priceElement = cartBoxes[i].querySelector(".cart-price");
    var _quantityElement3 = cartBoxes[i].querySelector(".cart-quantity");
    var _productImgElement = cartBoxes[i].querySelector(".cart-img");
    var _item3 = {
      title: title,
      price: _priceElement ? _priceElement.innerText : "",
      quantity: _quantityElement3 ? _quantityElement3.value : "",
      productImg: _productImgElement ? _productImgElement.src : ""
    };
    items.push(_item3);
  }
  localStorage.setItem("cartItems", JSON.stringify(items));
}

// Send Cart Items To Server
function sendCartItemsToServer() {
  var cartItems = getCartItems();
  var total = getCartTotal();
  var count = getCartCount();
  var data = {
    items: cartItems,
    total: total,
    count: count
  };
  fetch('https://9zxvvqfzs9.execute-api.us-east-2.amazonaws.com/dev/stripe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log('Success:', data);
    resetCart();
  })["catch"](function (error) {
    console.error('Error:', error);
  });
}

// Get Cart Items
function getCartItems() {
  var savedCartItems = localStorage.getItem("cartItems");
  if (savedCartItems) {
    return JSON.parse(savedCartItems);
  }
  return [];
}

// Get Cart Total
function getCartTotal() {
  return localStorage.getItem("cartTotal");
}

// Get Cart Count
function getCartCount() {
  var cartIcon = document.querySelector("#cart-icon");
  if (cartIcon) {
    return cartIcon.getAttribute("data-quantity");
  }
  return 0;
}

// Reset Cart
function resetCart() {
  localStorage.removeItem("cartItems");
  localStorage.removeItem("cartTotal");
  var cartContent = document.querySelector(".cart-content");
  if (cartContent) {
    cartContent.innerHTML = '';
  }
  updateTotal();
  updateCartCount();
}