// Get the necessary elements from the DOM
const addToCartButtons = document.querySelectorAll('.add-cart');
const cartIcon = document.getElementById('cart-icon');
const cartBadge = document.querySelector('.btn-badge');
const cartItemsContainer = document.querySelector('#cd-cart-items');
const cartTotalElement = document.querySelector('.cd-cart-total span');
const checkoutButton = document.querySelector('.checkout-btn');

// Initialize cart variables
let cartOpen = false;
let cartItems = [];
let cartTotal = 0;

// Function to toggle the cart visibility
function toggleCart() {
  cartOpen = !cartOpen;
  cartItemsContainer.classList.toggle('open');
}

/// Function to update the cart
function updateCart() {
  // Update the cart badge
  cartBadge.textContent = cartItems.length;
  
  // Save the cart items to local storage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}
  // Update cart items in the container
  cartItems.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="cd-qty">${item.quantity}x</span>
      <span class="cd-item-name">${item.title}</span>
      <span class="cd-price">${item.price.toFixed(2)}</span>
      <a href="#" class="cd-item-remove" data-id="${item.id}"></a>
    `;
    cartItemsContainer.appendChild(li);
  });

  // Update cart total
  cartTotalElement.textContent = cartTotal.toFixed(2);

// Enable or disable the checkout button based on cart items
checkoutButton.disabled = (cartItems.length === 0);

// Function to handle the "Add to Cart" button click event
function addToCart(e) {
  try {
    e.preventDefault();
    const button = e.target;
    const productElement = button.closest('.product');

    // Get product information from the clicked button's parent product element
    const id = productElement.id;
    const title = productElement.querySelector('.product-title').textContent;
    const price = parseFloat(productElement.querySelector('.price').textContent);
    let badge = Number(0)

    // Check if the product is already in the cart
    const existingItem = cartItems.find(item => item.id === id);
    if (!existingItem) {
      // Add the product to the cart
      const newItem = { id, title, price, quantity: 1 };
      cartItems.push(newItem);
    } else {
      existingItem.quantity++;
    }

    // Update total price
    cartTotal += price;

    // Update the cart and display the changes
    updateCart();
    

    // Update the cart badge
    cartItems.forEach(item => {
      badge += item.quantity
      console.log(badge)
      console.log(cartItems)
    })

    cartBadge.textContent = badge; 
  } catch (error) {
    console.error(error);
  }
}


// Function to handle the "Remove" button click event
function removeFromCart(e) {
  e.preventDefault();
  const removeButton = e.target;
  const itemId = removeButton.dataset.id;

  // Find the item in the cart
  const itemIndex = cartItems.findIndex(item => item.id === itemId);

  if (itemIndex !== -1) {
    // Update total price
    cartTotal -= cartItems[itemIndex].price * cartItems[itemIndex].quantity;

    // Remove the item from the cart
    cartItems.splice(itemIndex, 1);

    // Update the cart and display the changes
    updateCart();
  }
}

// Function to handle the cart icon click event
function handleCartIconClick() {
  // Toggle the visibility of the cart items container
  cartItemsContainer.style.display = cartItemsContainer.style.display === 'none' ? 'block' : 'none';
}

// Attach event listeners to the "Add to Cart" buttons
addToCartButtons.forEach(button => {
  button.addEventListener('click', addToCart);
});

// Attach event listener to the cart items container for the "Remove" buttons
cartItemsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('cd-item-remove')) {
    removeFromCart(e);
  }
});

// Attach event listener to the cart icon
cartIcon.addEventListener('click', handleCartIconClick);

document.getElementById("cart-icon").addEventListener("click", function() {
  var cart = document.getElementById("cd-cart");
  
  // Toggle the "speed-in" class to show/hide the cart items
  cart.classList.toggle("speed-in");
});