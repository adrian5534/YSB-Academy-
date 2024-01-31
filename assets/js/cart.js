// Define the functions at the top level of your script
function getLineItemsFromCart() {
  // This is just an example. Replace with your actual code to get items from cart.
  let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

  return cartItems.map(item => ({
    price_data: {
      unit_amount: parseInt(item.price.replace('$', '')) * 100, // Convert price to cents
      currency: 'usd',
      product_data: {
        name: item.name,
        // Add any other product data here
      },
    },
    quantity: item.quantity
  }));
}

async function createCheckoutSession(lineItems) {
  const response = await fetch('https://9zxvvqfzs9.execute-api.us-east-2.amazonaws.com/dev/stripe/create-checkout-session', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ lineItems })
});

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const session = await response.json();

  if (!session || !session.id) {
    throw new Error('Session ID is missing');
  }

  return session;
}

var stripe = Stripe('pk_test_51NhgPGBQNwcJUZaoqu5vmRrhrUrTaxsklnJP2bKdnRauLYE9iQ1i7tIBC9LZH5aLNyGsjolYwihENqdcQvq1vLV400nyuKcBin');

document.addEventListener('DOMContentLoaded', function() {
  const payBtn = document.querySelector(".btn-buy");
  if (payBtn) {
    payBtn.addEventListener("click", () => {
      let lineItems = getLineItemsFromCart(); // get items from local storage

      // Validate the data
      if (!Array.isArray(lineItems) || lineItems.some(item => !item.price_data || typeof item.price_data.unit_amount !== 'number')) {
        console.error('Invalid cartItems data');
        return;
      }

      createCheckoutSession(lineItems)
      .then((session) => {
        if (session && session.id) {
          return stripe.redirectToCheckout({ sessionId: session.id });
        } else {
          throw new Error('Session ID is missing');
        }
      })
      .catch((err) => console.log(err));
    });
  }

  const checkoutButton = document.querySelector('#checkout-button');
  if (checkoutButton) {
    checkoutButton.addEventListener('click', async () => {
      let lineItems = getLineItemsFromCart();
      let sessionData = await createCheckoutSession(lineItems);

      // ...
    });
  }
});