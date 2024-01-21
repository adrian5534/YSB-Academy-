const stripe = require('stripe')(process.env.stripe_api, {
  timeout: 5000, // Set the timeout to 5 seconds (adjust as needed)
});

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const lineItems = body.items.map((item) => {
    const unitAmount = parseInt(item.price.replace(/[^0-9.-]+/g, "") * 100);
    console.log("item-price:", item.price);
    console.log("unitAmount:", unitAmount);
    const name = item.title ? item.title : "Forex"; // Provide a default name if item.title is empty
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: name,
          images: [item.productImg]
        },
        unit_amount: unitAmount,
      },
      quantity: item.quantity,
    };
  });
  console.log("lineItems", lineItems);

  // Create Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: "https://www.ysbacademy.com/pages/success.html",
    cancel_url: "https://www.ysbacademy.com/pages/cancel.html",
    line_items: lineItems,
    billing_address_collection: "required"
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ url: session.url }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};