/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["stripe_key"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


const aws = require('aws-sdk');
const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const stripe = require('stripe');

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

// Retrieve Stripe secret key from SSM
let stripeKey;
let stripeGateway;
const ssm = new aws.SSM();
(async function getStripeKey() {
  try {
    const data = await ssm.getParameters({
      Names: ["stripe_key"],
      WithDecryption: true
    }).promise();

    stripeKey = data.Parameters[0].Value;
    stripeGateway = stripe(stripeKey, {
      timeout: 5000, // Set the timeout to 5 seconds
    });
  } catch (err) {
    console.log(err, err.stack);
  }
})();

// Your existing express app code...

// Items data
const items = [
  {
    id: 1,
    name: 'Forex Learn & Earn',
    description: 'Join our Forex Learn & Earn Telegram Group today and embark on an exciting journey of learning, sharing, and earning in the Forex market. Take advantage of the collective wisdom of experienced traders and elevate your trading game.',
    price: 100, // In cents
    imageUrl: 'https://example.com/images/item1.png',
  },
  {
    id: 2,
    name: 'Forex Beginner Course',
    description: 'Are you new to the world of Forex trading? Our Forex Beginner Course is designed to provide you with a solid foundation and essential knowledge to kickstart your journey towards becoming a successful Forex trader.',
    price: 50, // In cents
    imageUrl: 'https://example.com/images/item2.png',
  },
  {
    id: 3,
    name: 'Forex Advance Course',
    description: 'Take the leap and propel your Forex trading career to new heights with our Forex Advance Course. Unlock the advanced techniques, strategies, and insights that can set you apart as a top-notch Forex trader.',
    price: 200, // In cents
    imageUrl: 'https://example.com/images/item2.png',
  },
  {
    id: 4,
    name: 'Forex In-Person Classes',
    description: 'Join our Forex In-Person Classes to receive invaluable hands-on training, personal mentorship, and a supportive community of traders. Take the next step in your Forex trading journey and unlock your potential as a successful trader.',
    price: 400, // In cents
    imageUrl: 'https://example.com/images/item2.png',
  },
  // Add more items...
];

// Items Route
app.get('/items', (req, res) => {
  res.json(items);
});

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { lineitems } = req.body; // Get line_items from request body

    const session = await stripeGateway.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineitems, // Use line_items from request body
      mode: 'payment',
      success_url: "https://www.ysbacademy.com/pages/success.html", // success_url
      cancel_url: "https://www.ysbacademy.com/pages/cancel.html", // cancel_url
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error('Error creating Stripe Checkout session:', err.message);
    res.status(500).send({ error: 'An error occurred while creating Stripe Checkout session.' });
  }
});



app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
