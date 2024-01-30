let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');
let cartContent = document.querySelector('.cart-content'); // Move the declaration and assignment of 'cartContent' above the 'addProductToCart' function
let titleElement = document.querySelector('.cart-title');
let priceElement = document.querySelector('.cart-price');
let quantityElement = document.querySelector('.cart-quantity');
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
  
      // Set the innerHTML of the div to display the item's image, name, and price
      let itemDiv = document.createElement('div');
itemDiv.innerHTML = `
  <img src="${item.productImg}" alt="${item.name}">
  <h2>${item.name}</h2>
  <p>${item.price}</p>
`;
      // Append the item div to the cart content
      cartContent.appendChild(itemDiv);
    }
    updateTotal();
    restoreCartItems();
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


    // Add Product To Cart
function addProductToCart(title, price, productImg, quantity) {
  let cartContent = document.querySelector(".cart-content");
  let cartItems = document.querySelectorAll('.detail-box'); // Assuming '.detail-box' is the class of each cart item
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
  
    // Save the items and update the total and count after the item is fully added
    saveCartItems();
    updateTotal();
    updateCartCount();
  }
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
    if (quantityElement) { cartCount += parseInt(quantityElement.value); 
    } 
  } 
  let cartIcon = document.querySelector("#cart-icon"); 
  if (cartIcon) 
  { cartIcon.setAttribute("data-quantity", cartCount); 
} 
}

// Update Total
function updateTotal() {
  let detailBoxes = document.querySelectorAll('.detail-box');
  let total = 0;
  detailBoxes.forEach(function(detailBox) {
    let priceElement =     detailBox.querySelector('.cart-price');
    let quantityElement = detailBox.querySelector('.cart-quantity');
    if (priceElement && quantityElement) {
      let price = parseFloat(priceElement.innerText.replace("$", ""));
      if (!isNaN(price)) {
        let quantity = parseFloat(quantityElement.value);
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
  let cartContent = document.querySelector(".cart-content");
  if (cartContent) {
    cartContent.innerHTML = '';
  }

  let savedCartItems = localStorage.getItem("cartItems");
  if (savedCartItems) {
    let cartItems = JSON.parse(savedCartItems);
    for (let i = 0; i < cartItems.length; i++) {
      let item = cartItems[i];
      addProductToCart(item.title, item.price, item.productImg, item.quantity);
    }
  }
}

// Save Cart Items
function saveCartItems() {
  let cartBoxes = document.querySelectorAll(".cart-box");
  let items = [];
  for (let i = 0; i < cartBoxes.length; i++) {
    let title = cartBoxes[i].dataset.title;
    let priceElement = cartBoxes[i].querySelector(".cart-price");
    let quantityElement = cartBoxes[i].querySelector(".cart-quantity");
    let productImgElement = cartBoxes[i].querySelector(".cart-img");
    let item = {
      title: title,
      price: priceElement ? priceElement.innerText : "",
      quantity: quantityElement ? quantityElement.value : "",
      productImg: productImgElement ? productImgElement.src : "",
    };
    items.push(item);
  }
  localStorage.setItem("cartItems", JSON.stringify(items));
}

// Send Cart Items To Server
function sendCartItemsToServer() {
  let cartItems = getCartItems();
  let total = getCartTotal();
  let count = getCartCount();
  let data = {
    items: cartItems,
    total: total,
    count: count,
  };
  fetch('https://9zxvvqfzs9.execute-api.us-east-2.amazonaws.com/dev/stripe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    resetCart();
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

// Get Cart Items
function getCartItems() {
  let savedCartItems = localStorage.getItem("cartItems");
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
  let cartIcon = document.querySelector("#cart-icon");
  if (cartIcon) {
    return cartIcon.getAttribute("data-quantity");
  }
  return 0;
}

// Reset Cart
function resetCart() {
  localStorage.removeItem("cartItems");
  localStorage.removeItem("cartTotal");
  let cartContent = document.querySelector(".cart-content");
  if (cartContent) {
    cartContent.innerHTML = '';
  }
  updateTotal();
  updateCartCount();
}