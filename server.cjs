const express = require("express");
const dotenv = require("dotenv");
const stripe = require("stripe");
const MetaApi = require('metaapi.cloud-sdk').default;
const cors = require('cors');
const path = require('path');

// Load Variables
dotenv.config();
 

// Start Server
const app = express();

app.use(cors()); // Enable CORS

app.use(express.static(path.join(__dirname, 'assets', 'pages'), {
  setHeaders: (res, path) => {
    if (path.endsWith(".css")) {
      res.setHeader("Content-Type", "text/css");
    }
  },
}));


app.use(express.static("dist"));
app.use(express.json());

// About Route
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'pages', 'about.html'));
});

// Contact Route
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'pages', 'contact.html'));
});

// Blog Route
app.get("/blog", (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'pages', 'blog.html'));
});

// FAQ Route
app.get("/faq", (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'pages', 'faq.html'));
});

// Shop Route
app.get('/shop', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'pages', 'shop.html'));
});

// mt5-provisioning-profile
app.get('/mt5-provisioning-profile', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'assets/pages/mt5-provisioning-profile.html'));
});

// Success Route
app.get("/success", (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'pages', 'success.html'));
});

// Cancel Route
app.get("/cancel", (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'pages', 'cancel.html'));
});

// Catch-all Route (moved to the end)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'index.html'));
});
 

// Stripe Gateway
let stripeGateway = stripe(process.env.stripe_api, {
  timeout: 5000, // Set the timeout to 5 seconds (adjust as needed)
});
 
const api = new MetaApi(process.env.meta_api,);

app.post('/create-account', async (req, res) => {
  const {login, password, server} = req.body;
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
    res.json(account);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

//app.post('https://mt-provisioning-api-v1.agiliumtrade.agiliumtrade.ai/users/current/accounts', async (req, res) => {
  //const {login, password, server} = req.body;
  //try {
    //const account = await api.metatraderAccountApi.createAccount({
      //name: 'User account',
      //type: 'cloud',
      //login: login,
      //password: password,
      //server: server,
      // Add other necessary properties
    //}, {
      //headers: {
        //'auth-token': process.env.meta_api, // access the auth token from environment variables
      //}
    //});
    //res.json(account);
  //} catch (error) {
   // res.status(500).json({message: error.message});
  //}
//});

app.post("/stripe-checkout", async (req, res) => {
  const lineItems = req.body.items.map((item) => {
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
  const session = await stripeGateway.checkout.sessions.create({
    // payment_method_types: ["card"],
    payment_method_types: ["card"],
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
    line_items: lineItems,

    // Asking Address In Stripe 
    billing_address_collection: "required"
  });
  res.json(session.url);
}); 



app.listen(3000, () => {
  console.log("listening on port 3000")
});  