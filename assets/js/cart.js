// Get all add-cart icons and attach event listeners
//var addCartIcons = document.querySelectorAll('.add-cart');
//addCartIcons.forEach(function(icon) {
 // icon.addEventListener('click', addCartClicked);
//});

var stripe = Stripe('pk_test_51NhgPGBQNwcJUZaoqu5vmRrhrUrTaxsklnJP2bKdnRauLYE9iQ1i7tIBC9LZH5aLNyGsjolYwihENqdcQvq1vLV400nyuKcBin');

const items = [
  {
    name: 'Forex Basic 1',
    price: '$50'
  },
  {
    name: 'Forex Basic 2',
    price: '$150'
  },
  // Add more items as needed
];

const payBtn = document.querySelector(".btn-buy");

fetch('/create-checkout-session', {
  method: 'POST',
})
.then(function(response) {
  return response.json();
})
.then(function(session) {
  return stripe.redirectToCheckout({ sessionId: session.id });
})
.then(function(result) {
  // If `redirectToCheckout` fails due to a browser or network
  // error, you should display the localized error message to your
  // customer using `error.message`.
  if (result.error) {
    alert(result.error.message);
  }
})
.catch(function(error) {
  console.error('Error:', error);
});

payBtn.addEventListener("click", () => {
  fetch("/stripe-checkout", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({
      items: JSON.parse(localStorage.getItem("cartItems")),
    }),
  })
    .then((res) => res.json())
    .then((url) => {
      location.href = url;
    })
    .catch((err) => console.log(err));
}); 