const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');
const stripe = require('stripe'); // Import Stripe

// Initialize Stripe
const stripeGateway = stripe('sk_test_51NhgPGBQNwcJUZaolMVemO1ym12GZCacGZd73yqhyiLSTlvfig16VBQ5eVIOZDh4VCBp2dzAo6rookentVwxMdX9000x3V3Hfh');

app.post("/stripe", async (req, res) => {
  console.log('req.body:', req.body); // Log the request body
  try {
    const lineItems = req.body.lineItems;

    // Check if lineItems is defined and is an array
    if (!lineItems || !Array.isArray(lineItems)) {
      console.error('lineItems is not an array:', lineItems);
      return res.status(400).send({ error: 'Bad Request' });
    }

    const formattedLineItems = lineItems.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }));

    const session = await stripeGateway.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: formattedLineItems,
      mode: 'payment',
      success_url: "https://www.ysbacademy.com/pages/success.html", // success_url
      cancel_url: "https://www.ysbacademy.com/pages/cancel.html", // cancel_url
      billing_address_collection: "required"
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error('Stripe session creation failed:', err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  return awsServerlessExpress.proxy(server, event, context);
};