// Define an array to store the cart items
let cartItems = [];

// Add to Cart
function addToCart(event) {
    const button = event.target;
    const productBox = button.closest('.product-box');
  
    if (productBox) {
      const titleElement = productBox.querySelector('.product-title');
      const priceElement = productBox.querySelector('.price');
  
      if (titleElement && priceElement) {
        const title = titleElement.textContent;
        const price = priceElement.textContent;
        const item = {
          title: title,
          price: price
        };
  
        cartItems.push(item);
        updateCartCount();
      } else {
        console.log("Error: Title or price element not found!");
      }
    } else {
      console.log("Error: Product box not found!");
    }
  }

// Update Cart Count
function updateCartCount() {
    const cartCount = document.querySelector('#cart-count');
    cartCount.textContent = cartItems.length;
  }

// Toggle Search
function toggleSearch() {
  const searchInput = document.querySelector('.search-input');
  searchInput.classList.toggle('active');
}

// Toggle Cart
function toggleCart() {
    const cartOverlay = document.querySelector('.cart-overlay');
    cartOverlay.classList.toggle('active');

    const shopContent = document.querySelector('.shop-content');
    shopContent.classList.toggle('active');

    const cartItems = document.querySelector('.cart-items');
    if (cartOverlay.classList.contains('active')) {
      displayCartItems();
      cartItems.classList.add('show');
    } else {
      cartItems.classList.remove('show');
    }
  }

// Event Listener - Add to Cart
const cartBtns = document.querySelectorAll('.add-cart');
cartBtns.forEach((btn) => {
  btn.addEventListener('click', addToCart);
});

// Event Listener - Toggle Search
const searchBtn = document.querySelector('[aria-label="toggle search"]');
searchBtn.addEventListener('click', toggleSearch);

// Event Listener - Toggle Cart
const cartIcon = document.querySelector('[aria-label="cart"]');
cartIcon.addEventListener('click', toggleCart);

// Display Cart Items
function displayCartItems() {
  const cartItemsContainer = document.querySelector('.cart-items');
  cartItemsContainer.innerHTML = '';

  cartItems.forEach((item) => {
    const cartItemElement = document.createElement('div');
    cartItemElement.classList.add('cart-item');

    const titleElement = document.createElement('span');
    titleElement.textContent = item.title;

    const priceElement = document.createElement('span');
    priceElement.textContent = item.price;

    cartItemElement.appendChild(titleElement);
    cartItemElement.appendChild(priceElement);

    cartItemsContainer.appendChild(cartItemElement);
  });
}

// Get the cart icon element
const cartIconElement = document.getElementById('cart-icon');

// Get the shop content container
const shopContent = document.querySelector('.shop-content');

// Add click event listener to cart icon
cartIconElement.addEventListener('click', () => {
  // Toggle the visibility of shop content
  shopContent.classList.toggle('active');
});