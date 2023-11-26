import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import Stripe  from 'stripe';

dotenv.config();

// Stripe gateway
let stripeGateway =  Stripe(process.env.STRIPE_SECRET_KEY);
let DOMAIN = process.env.DOMAIN;

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('assets')); 
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "assets"});
});
 
// Function for going to the shop page
app.get('/shop', function(req, res) {
  fs.readFile('items.json', function(error, data) {
    if (error) {
      res.status(500).end();
    } else {
      res.render('shop.ejs', {
        items: JSON.parse(data),
      }); 
    }
  }); 
});

// Success
app.get('/success', (req, res) => {
  res.sendFile("success.html", { root: "assets"});
});

// Cancel 
app.get('/cancel', (req, res) => {
  res.sendFile("cancel.html", { root: "assets"});
});

app.post("/stripe-checkout", async (req, res) => {
  if (!req.body.items || !Array.isArray(req.body.items)) {
    res.status(400).json({ error: "Invalid items property" });
    return;
  }

  const items = req.body.items.map((item) => {
    const unit_amount = parseInt(item.price.replace(/[^0-9.-]+/g, '') * 100);
    console.log("item-price:", item.price)
    console.log("unit_amount:", unit_amount);
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.imgName]
        },
        unit_amount: unit_amount,
      },
      quantity: item.totalItems,
    };
  });
  console.log("items:", items);

  // Create Checkout Session
  const session = await stripeGateway.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${DOMAIN}views/success`,
    cancel_url: `${DOMAIN}views/cancel`,
    line_items: items,
    // Asking For Address In Stripe Checkout Page
    billing_address_collection: "required",
  });
  res.json({ url: session.url });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});