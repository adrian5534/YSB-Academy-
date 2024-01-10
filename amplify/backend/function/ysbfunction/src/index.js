const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const MetaApi = require('metaapi.cloud-sdk').default;
const api = new MetaApi(process.env.meta_api);

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  // Check if the request is for the /create-account route
  if (event.path === '/create-account' && event.httpMethod === 'POST') {
    const {login, password, server} = JSON.parse(event.body);
    try {
      const account = await api.metatraderAccountApi.createAccount({
        name: 'User account',
        type: 'cloud',
        login: login,
        password: password,
        server: server,
        // Add other necessary properties
      }, {
        headers: {
          'auth-token': process.env.meta_api, // access the auth token from environment variables
        }
      });
      return {
        statusCode: 200,
        body: JSON.stringify(account),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({message: error.message}),
      };
    }
  }

  // Existing Stripe code
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'My Product',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://ysbacademy.com/pages/success.html',
    cancel_url: 'https://ysbacademy.com/pages/cancel.html',
  });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*"
    },
    body: JSON.stringify({ id: session.id }),
  };
};