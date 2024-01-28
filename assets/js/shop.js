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

  // Save Cart Items
  function saveCartItems() {
    let cartItems = [];
    let cartBoxes = document.querySelectorAll(".cart-box");
    for (let i = 0; i < cartBoxes.length; i++) {
      let cartBox = cartBoxes[i];
      let titleElement = cartBox.querySelector(".cart-product-title");
      let priceElement = cartBox.querySelector(".price");
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
    updateCartCount(); // Update the cart count after saving the items
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
    let detailBoxes = document.querySelectorAll('.detail-box'); // Changed '.cart-box' to '.detail-box'
    let total = 0;
    detailBoxes.forEach(function(detailBox) {
      let priceElement = detailBox.querySelector('.cart-price'); // Changed '.cart-item-price' to '.cart-price'
      let quantityElement = detailBox.querySelector('.cart-quantity');
      if (priceElement && quantityElement) {
        let price = parseFloat(priceElement.innerText.replace("$", ""));
        if (!isNaN(price)) { // Check if the price is a valid number
          let quantity = parseFloat(quantityElement.value);
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
      let cartContent = document.querySelector(".cart-content");
      if (cartContent) {
        // Clear existing items in the cart
        cartContent.innerHTML = '';
      }
    
      let savedCartItems = localStorage.getItem("cartItems");
      if (savedCartItems) {
        let cartItems = JSON.parse(savedCartItems);
        for (let i = 0; i < cartItems.length; i++) {
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

    // No more editing below this line
    function sendCartItemsToServer() {
      let cartItems = getCartItems(); // Assuming this function returns an array of cart items
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
      let cartIcon = document.querySelector('#cart-icon');
      let cart = document.querySelector('.cart');
      let closeCart = document.querySelector('#close-cart');
      let cartContent = document.querySelector('.cart-content');
      // ... rest of your code ...
    
      let lineItems = [];
      let cartBoxes = document.querySelectorAll(".cart-box");
      

    
      cartBoxes.forEach(cartBox => {
        let title = cartBox.dataset.title;
        let priceElement = cartBox.querySelector(".price");
        if (priceElement) {
          let price = parseFloat(priceElement.textContent.replace('$', '')) * 100; // convert to cents
          let quantityElement = cartBox.querySelector(".cart-quantity");
          let quantity = parseInt(quantityElement.value);
    
          let item = {
            price_data: {
              currency: 'usd',
              product_data: {
                name: title,
              },
              unit_amount: price,
            },
            quantity: quantity,
          };
    
          lineItems.push(item);
        } else {
          console.error('Could not find element with class name "cart-price"');
        }
      });


if (cartBoxes.length > 0) {
  // Your existing code to populate the lineItems array...

  if (lineItems.length > 0) {
    (async function() {
      try {
        let response = await fetch('https://9zxvvqfzs9.execute-api.us-east-2.amazonaws.com/dev/stripe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            lineItems: lineItems,
          }),
        });
        let data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    })();
  } else {
    console.error('No items in the cart to send to the server');
  }
} else {
  console.log('No cart items to process');
}
    }