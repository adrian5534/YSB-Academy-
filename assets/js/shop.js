// Define an array to store the cart items
let cartItems = [];

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
  const cartItemsContainer = document.querySelector('#cart-items');
  cartItemsContainer.classList.toggle('active');

  const shopContent = document.querySelector('.shop-content');
  shopContent.classList.toggle('active');

  const cartItemsContent = document.getElementById('cart-items');
  if (cartItemsContainer.classList.contains('active')) {
    displayCartItems(cartItemsContent);
    cartItemsContent.classList.add('show');
  } else {
    cartItemsContent.classList.remove('show');
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
function displayCartItems(cartitems) {
    const container = document.getElementById("cart-items");
    if (container) {
      container.innerHTML = "";
  
      cartItems.forEach((item) => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
  
        const imgElement = document.createElement('img');
        imgElement.src = item.imageSrc;
  
        const titleElement = document.createElement('span');
        titleElement.textContent = item.title;
  
        const priceElement = document.createElement('span');
        priceElement.textContent = item.price;
  
        cartItemElement.appendChild(imgElement);
        cartItemElement.appendChild(titleElement);
        cartItemElement.appendChild(priceElement);
  
        container.appendChild(cartItemElement);
      });
    } else {
      console.error(`Container element with ID '${containerId}' not found.`);
    }
  }

// Function to add item to cart
function addToCart(event) {
  const button = event.target;
  const productBox = button.closest('.product-box');

  if (productBox) {
    const imgElement = productBox.querySelector('.product-img');
    const titleElement = productBox.querySelector('.product-title');
    const priceElement = productBox.querySelector('.price');

    if (imgElement && titleElement && priceElement) {
      const imageSrc = imgElement.src;
      const title = titleElement.textContent;
      const price = priceElement.textContent;

      const item = {
        imageSrc: imageSrc,
        title: title,
        price: price
      };

      cartItems.push(item);
      updateCartCount();
    } else {
      console.log("Error: Image, Title, or Price element not found!");
    }
  } else {
    console.log("Error: Product box not found!");
  }
}

// Toggle Cart Overlay
function toggleCartOverlay() {
    const cartOverlay = document.querySelector('.cart-overlay');
    const cartContent = document.querySelector('.cart-content');
    const shopContent = document.querySelector('#shop .shop-content');
  
    if (cartOverlay && cartContent && shopContent) {
        cartOverlay.classList.toggle('show');
        cartContent.innerHTML = '';
  
      // Check if cartItems is not empty
      if (cartItems.length !== 0) {
        displayCartItems('cart-items');
      }
         // Toggle shop content opacity
    shopContent.classList.toggle('active');
}else {
      console.error('Error: Cart Overlay or Cart Content not found.');
    }
  }
// Event Listener - Toggle Cart Overlay
cartIcon.addEventListener('click', () => toggleCartOverlay());