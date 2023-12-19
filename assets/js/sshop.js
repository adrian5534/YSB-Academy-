let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');
let cartContent = document.querySelector('.cart-content'); // Move the declaration and assignment of 'cartContent' above the 'addProductToCart' function
let titleElement = document.querySelector('.product-title');
let priceElement = document.querySelector('.price');
let quantityElement = document.querySelector('.quantity');
let productImgElement = document.querySelector('.product-img');

let item = {
  title: titleElement ? titleElement.innerText : "",
  price: priceElement ? priceElement.innerText : "",
  quantity: quantityElement ? quantityElement.value : "",
  productImg: productImgElement ? productImgElement.src : "",
};

// Open Cart
cartIcon.onclick = () => {
  cart.classList.add("active");
};

// Close Cart
closeCart.onclick = () => {
  cart.classList.remove("active");
} 

// Cart Working JS
document.addEventListener("DOMContentLoaded", ready);

// Making Function
function ready() {
  // Retrieve saved cart items from localStorage
  let savedCartItems = localStorage.getItem("cartItems");
  if (savedCartItems) {
    let cartItems = JSON.parse(savedCartItems);
    // Clear the cart content before adding items
    cartContent.innerHTML = '';
    for (let i = 0; i < cartItems.length; i++) {
      let item = cartItems[i];
      // Create a new div for each item
      let itemDiv = document.createElement('div');
      // Set the innerHTML of the div to display the item's image, name, and price
      itemDiv.innerHTML = `
      <img src="${item.productImg}" alt="${item.name}">
      <h2>${item.name}</h2>
      <p>${item.price}</p>
`;
      // Append the item div to the cart content
      cartContent.appendChild(itemDiv);
    }
    updateTotal();
  }

  // Remove Items From Cart
  cartContent.addEventListener('click', function(event) {
    if (event.target.classList.contains('cart-remove')) {
      let buttonClicked = event.target;
      buttonClicked.parentElement.remove();
      updateTotal();
      saveCartItems();
    }
  });
}

  // Save Cart Items
function saveCartItems() {
  let cartItems = [];
  let cartBoxes = document.querySelectorAll(".cart-box");
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let titleElement = cartBox.querySelector(".cart-product-title");
    let priceElement = cartBox.querySelector(".cart-price");
    let productImgElement = cartBox.querySelector(".cart-img");
    let quantityElement = cartBox.querySelector(".cart-quantity");
    if (titleElement && priceElement && productImgElement && quantityElement) {
      let title = titleElement.innerText;
      let price = priceElement.innerText;
      let productImg = productImgElement.src;
      let quantity = quantityElement.value;
      cartItems.push({ title, price, productImg, quantity });
    }
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  updateTotal(); // Update the total after saving the items
}
// Add Product To Cart
function addProductToCart(title, price, productImg, quantity) {
  let cartContent = document.querySelector(".cart-content");
  if (cartContent) {
    let cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    // Set the data-title attribute
    cartShopBox.dataset.title = title;
    let cartBoxContent = `
      <img src="${productImg}" alt="" class="cart-img">
      <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="${quantity}" class="cart-quantity">
      </div>
      <i class='bx bxs-trash-alt cart-remove'></i>
    `;
    cartShopBox.innerHTML = cartBoxContent;
    cartContent.appendChild(cartShopBox);

    let quantityElement = cartShopBox.querySelector(".cart-quantity");
    quantityElement.addEventListener('change', function(event) {
      let newQuantity = parseInt(event.target.value);
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
  let quantityElement = cartShopBox.querySelector(".cart-quantity");
  if (quantityElement) {
    quantityElement.value = newQuantity;
  }
}

// Get all add-cart icons and attach event listeners
let shopProducts = document.querySelectorAll('.add-cart');
shopProducts.forEach(function(button) {
  button.addEventListener('click', function(event) {
    let product = event.target.parentElement;
    let title = product.querySelector('.product-title').innerText;
    let price = product.querySelector('.price').innerText;
    let productImg = product.querySelector('.product-img').src;
    addProductToCart(title, price, productImg, 1);
  });
});
  
// Update Cart Count
function updateCartCount() {
  let cartBoxes = document.querySelectorAll(".cart-box");
  let cartCount = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    let quantityElement = cartBoxes[i].querySelector(".cart-quantity");
    if (quantityElement) {
      cartCount += parseInt(quantityElement.value);
    }
  }
  let cartIcon = document.querySelector("#cart-icon");
  if (cartIcon) {
    cartIcon.setAttribute("data-quantity", cartCount);
  }
}

  // Update Total
  function updateTotal() {
    let cartBoxes = document.querySelectorAll('.cart-box');
    let total = 0;
    cartBoxes.forEach(function(cartBox) {
      let priceElement = cartBox.querySelector('.cart-price');
      let quantityElement = cartBox.querySelector('.cart-quantity');
      if (priceElement && quantityElement) {
        let price = parseFloat(priceElement.innerText.replace("$", ""));
        if (!isNaN(price)) { // Check if the price is a valid number
          let quantity = parseFloat(quantityElement.value);
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
      let savedCartItems = localStorage.getItem("cartItems");
      if (savedCartItems) {
        let cartItems = JSON.parse(savedCartItems);
        for (let i = 2; i < cartItems.length; i++) {
          let item = cartItems[i];
          let title = item.title;
          let price = item.price;
          let productImg = item.productImg;
          let quantity = item.quantity;
          addProductToCart(title, price, productImg, quantity);
        }
        updateTotal(); // Update the total after restoring the items
        updateCartCount(); // Update the cart count after restoring the items
      }
    }