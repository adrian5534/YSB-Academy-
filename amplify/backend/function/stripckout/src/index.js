const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');
const stripe = require('stripe'); // Import Stripe

// Initialize Stripe
const stripeGateway = stripe('sk_test_51NhgPGBQNwcJUZaolMVemO1ym12GZCacGZd73yqhyiLSTlvfig16VBQ5eVIOZDh4VCBp2dzAo6rookentVwxMdX9000x3V3Hfh');

const server = awsServerlessExpress.createServer(app);

exports.handler = async (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  // Check if event.body is defined
  if (!event.body || event.body === 'undefined') {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid request body' }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    };
  }

  let body;
  // Try to parse the body
  try {
    body = JSON.parse(event.body);
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid JSON format' }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    };
  }

  // Validate the body
  if (!Array.isArray(body.items) || body.items.length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid items in request body' }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    };
  }

  const lineItems = body.items.map((item) => {
    const unitAmount = parseInt(item.price.replace(/[^0-9.-]+/g, "") * 100);
    const name = item.title ? item.title : "Forex";
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
  
  // Create Checkout Session
  let session;
  try {
    session = await stripeGateway.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: "https://www.ysbacademy.com/pages/success.html",
      cancel_url: "https://www.ysbacademy.com/pages/cancel.html",
      line_items: lineItems, // use the lineItems from above
      billing_address_collection: "required"
    });
  } catch (error) {
    console.error('Stripe session creation failed:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    };
  }

  // Proxy the event to the server
  awsServerlessExpress.proxy(server, event, context);
};