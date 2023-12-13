var cartIcon = document.getElementById("cart-icon");
var cartBox = document.querySelector("cart-content"); // Replace with the actual selector for your cart box
var priceElement = product.querySelector(".product-price");

// Check if product element exists before accessing its properties
if (product !== null) {
  var priceElement = product.querySelector(".product-price");
  // Rest of your code...
} else {
  console.error('Product element not found');
}
// Check if priceElement exists before accessing its innerText property
var price = "";
if (priceElement != null) {
  price = priceElement.innerText;
}
var cartIcon = document.getElementById("cart-icon");
var cart = document.getElementById("cart");

// Open Cart
cartIcon.onclick = () => {
  cart.classList.add("active");
}; 

// Close Cart
var closeCart = document.getElementById("close-cart");
closeCart.onclick = () => {
   cart.classList.remove("active");
};

// Get all add-cart icons and attach event listeners
var cartContent = document.getElementById("cart-content");
var addCartIcons = document.querySelectorAll("add-cart");
addCartIcons.forEach(function(icon) {
  icon.addEventListener('click', addCartClicked);
});

// Save item to localStorage
function saveItemToLocalStorage(item) {
 var existingItems = localStorage.getItem("cartItems");
 var cartItems = existingItems ? JSON.parse(existingItems) : [];

 cartItems.push(item);

 localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// Remove Cart Item
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();

  // Retrieve title of the item being removed
  var title = event.target.parentElement.querySelector("cart-product-title").innerText;

  // Remove the item from localStorage
  removeItemFromLocalStorage(title);
}

// Quantity Change
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
     input.value = 1;
  }
  updatetotal();
  updateCartIcon();

  // Retrieve title of the item
  var title = event.target.parentElement.querySelector("cart-product-title").innerText;

  // Update the quantity of the item in localStorage
  updateItemQuantityInLocalStorage(title, input.value);
}

// Add Cart Function
function addCartClicked(event) {
  var button = event.target;
  var product = button.parentElement.parentElement;
  
  // Check if product element exists
  if (product) {
    var priceElement = product.querySelector(".product-price");

    // Check if price element exists
    if (priceElement) {
      var price = priceElement.innerText;
      // Rest of your code...
    } else {
      throw new Error('Price element not found');
    }
  } else {
    throw new Error('Product element not found');
  }
}


// Updated addProductToCart function
function addProductToCart(item) {
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText === item.title) {
      alert("You have already added this item to the cart");
      return;
    }
  }
 
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");

  var cartBoxContent = `
    <img src="${item.productImg}" alt="" class="cart-img" />
    <div class="details-box">
      <div class="cart-product-title">${item.title}</div>
      <div class="cart-price">${item.price}</div>
      <input 
        type="number" 
        name="" 
        id="" 
        value="${item.quantity}" 
        class="cart-quantity" 
      />
    </div>
    <!-- Remove Item-->
    <i class='bx bx-trash-alt cart-remove'></i>`;

  cartShopBox.innerHTML = cartBoxContent;
  cartItems.appendChild(cartShopBox);

  cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
  cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);

  updateCartIcon();


  /// Save the added item to local storage
  saveItemToLocalStorage(item);
}

// Update Total
function updatetotal() {
  // ... existing code ...

 // Update cart items in localStorage
 var cartBoxes = cartContent.getElementsByClassName("cart-box");
 var updatedCartItems = [];

 for (var i = 0; i < cartBoxes.length; i++) {
   var cartBox = cartBoxes[i];
   var titleElement = cartBox.getElementsByClassName("cart-product-title")[0];
   var priceElement = cartBox.getElementsByClassName("cart-price")[0];
   var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];

   if (titleElement && priceElement && quantityElement) {
     var item = {
       title: titleElement.innerText,
       price: priceElement.innerText,
       quantity: quantityElement.value
     };
   
     updatedCartItems.push(item);
   }
 }

 localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
}

// Update Cart Icon
function updateCartIcon() {
  var cartItemsCount = document.getElementsByClassName("cart-box").length;
  cartIcon.dataset.count = cartItemsCount;
}

// Load Cart Items from Local Storage
function loadCartItemsFromLocalStorage() {
  var existingItems = localStorage.getItem("cartItems");
  var cartItems = existingItems ? JSON.parse(existingItems) : [];

  for (var i = 0; i < cartItems.length; i++) {
    addProductToCart(cartItems[i]);
  }
}

// Call function to load cart items from local storage
loadCartItemsFromLocalStorage();
