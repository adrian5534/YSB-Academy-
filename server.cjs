const express = require("express");
const dotenv = require("dotenv");
const stripe = require("stripe");
const MetaApi = require('metaapi.cloud-sdk').default;
const cors = require('cors');

// Load Variables
dotenv.config();


// Start Server
const app = express();

app.use(cors()); // Enable CORS

app.use("/assets", express.static("assets", {
  setHeaders: (res, path) => {
    if (path.endsWith(".css")) {
      res.setHeader("Content-Type", "text/css");
    }
  },
}));


// Home Route
app.get("/", (req, res) => {
  res.sendFile("index.html", {root: "assets"});
});

// About Route
app.get("/about", (req, res) => {
  res.sendFile("pages/about.html", {root: "assets"});
});

// Contact Route
app.get("/contact", (req, res) => {
  res.sendFile("pages/contact.html", {root: "assets"});
});

// blog Route
app.get("/blog", (req, res) => {
  res.sendFile("pages/blog.html", {root: "assets"});
});

// Shop Route
app.get("/shop", (req, res) => {
  res.sendFile("pages/shop.html", {root: "assets"});
});

// Success Route
app.get("/success", (req, res) => {
  res.sendFile("pages/success.html", {root: "assets"});
});

// Cancel Route
app.get("/cancel", (req, res) => {
  res.sendFile("pages/cancel.html", {root: "assets"});
});


  

app.use(express.static("assets"));
app.use(express.json());

let stripeGateway = stripe(process.env.stripe_api, {
  timeout: 5000, // Set the timeout to 5 seconds (adjust as needed)
});
 
const api = new MetaApi(process.env.meta_api,);

app.post('https://mt-provisioning-api-v1.agiliumtrade.agiliumtrade.ai/users/current/accounts', async (req, res) => {
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