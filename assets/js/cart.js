// Get all add-cart icons and attach event listeners
//var addCartIcons = document.querySelectorAll('.add-cart');
//addCartIcons.forEach(function(icon) {
 // icon.addEventListener('click', addCartClicked);
//});

document.addEventListener('DOMContentLoaded', function() {
  const payBtn = document.querySelector(".btn-buy");
  if (payBtn) {
    payBtn.addEventListener("click", () => {
      let lineItems = JSON.parse(localStorage.getItem("cartItems")); // get items from local storage

      fetch('https://9zxvvqfzs9.execute-api.us-east-2.amazonaws.com/dev/stripe', { // replace with your actual API Gateway URL
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify({
          lineItems: lineItems,
        }),
      })
        .then((res) => res.json())
        .then((session) => {
          return stripe.redirectToCheckout({ sessionId: session.id });
        })
        .catch((err) => console.log(err));
    });
  }

  const checkoutButton = document.querySelector('#checkout-button');
  if (checkoutButton) {
    checkoutButton.addEventListener('click', async () => {
      let lineItems = getLineItemsFromCart(); // replace with your actual function to get line items from cart
      let sessionData = await createCheckoutSession(lineItems);

      if (sessionData && sessionData.id) {
        // Redirect to Stripe Checkout
        stripe.redirectToCheckout({ sessionId: sessionData.id });
      } else {
        // Handle error
        console.error('Failed to create checkout session.');
      }
    });
  }
});