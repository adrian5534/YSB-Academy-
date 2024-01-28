"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
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
    var _priceElement = cartBox.querySelector(".price");
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
  updateCartCount(); // Update the cart count after saving the items
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
    var _quantityElement2 = cartShopBox.querySelector(".cart-quantity");
    _quantityElement2.addEventListener('change', function (event) {
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
  var detailBoxes = document.querySelectorAll('.detail-box'); // Changed '.cart-box' to '.detail-box'
  var total = 0;
  detailBoxes.forEach(function (detailBox) {
    var priceElement = detailBox.querySelector('.cart-price'); // Changed '.cart-item-price' to '.cart-price'
    var quantityElement = detailBox.querySelector('.cart-quantity');
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
  document.querySelector(".total-price").innerText = "$" + total; // Update the total price
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
function sendCartItemsToServer() {
  var cartItems = getCartItems(); // Assuming this function returns an array of cart items
  if (cartItems.length === 0) {
    console.error('No items in the cart to send to the server');
    return; // Exit the function if the cart is empty
  }

  // Code to send cart items to the server

  // Reset the cart
  resetCart();
  console.log('Cart items sent to the server');
  console.log('Cart items:', cartItems);
  console.log('Cart total:', getCartTotal());
  console.log('Cart count:', getCartCount());
}
document.addEventListener("DOMContentLoaded", readySecond);
function readySecond() {
  var cartIcon = document.querySelector('#cart-icon');
  var cart = document.querySelector('.cart');
  var closeCart = document.querySelector('#close-cart');
  var cartContent = document.querySelector('.cart-content');
  // ... rest of your code ...

  var lineItems = [];
  var cartBoxes = document.querySelectorAll(".cart-box");
  cartBoxes.forEach(function (cartBox) {
    var title = cartBox.dataset.title;
    var priceElement = cartBox.querySelector(".price");
    if (priceElement) {
      var price = parseFloat(priceElement.textContent.replace('$', '')) * 100; // convert to cents
      var _quantityElement4 = cartBox.querySelector(".cart-quantity");
      var quantity = parseInt(_quantityElement4.value);
      var _item3 = {
        price_data: {
          currency: 'usd',
          product_data: {
            name: title
          },
          unit_amount: price
        },
        quantity: quantity
      };
      lineItems.push(_item3);
    } else {
      console.error('Could not find element with class name "cart-price"');
    }
  });
  if (cartBoxes.length > 0) {
    // Your existing code to populate the lineItems array...

    if (lineItems.length > 0) {
      _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var response, data;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return fetch('https://9zxvvqfzs9.execute-api.us-east-2.amazonaws.com/dev/stripe', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  lineItems: lineItems
                })
              });
            case 3:
              response = _context.sent;
              _context.next = 6;
              return response.json();
            case 6:
              data = _context.sent;
              console.log(data);
              _context.next = 13;
              break;
            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](0);
              console.error('Error:', _context.t0);
            case 13:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 10]]);
      }))();
    } else {
      console.error('No items in the cart to send to the server');
    }
  } else {
    console.log('No cart items to process');
  }
}