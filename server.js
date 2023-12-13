import express from "express";
import dotenv from "dotenv";
import stripe from "stripe";
// Load Variables
dotenv.config();


// Start Server
const app = express();

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
app.get("/shhop", (req, res) => {
  res.sendFile("pages/shhop.html", {root: "assets"});
});

app.use(express.static("assets"));
app.use(express.json());

let stripeGateway = stripe(process.env.stripe_api);

app.post("/stripe-checkout", async (req, res) => {
  const lineItems = req.body.items.map((item) => {
    const unitAmount = parseInt(item.price.replace(/[^0-9.-]+/g, "") * 100);
    console.log("item-price:", item.price);
    console.log("unitAmount:", unitAmount);
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
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
    payment_method_type: ["card"],
    mode: "payment",
    success_url: `${DOMAIN}/success`,
    cancel_url: `${DOMAIN}/cancel`,
    line_item: lineItems,

    // Asking Address In Stripe 
    billing_address_collection: "required"
  });
  res.json(session.url);
});

app.listen(3000, () => {
  console.log("listening on port 3000")
});