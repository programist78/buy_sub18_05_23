import stripePackage from "stripe";

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { priceId, connectedAccountId } = req.body;

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
          {
            price: priceId,
            // price: "price_1NGiVoBD1PAMw3USqVMWCWQo",
            quantity: 1,
          },
        ],
        payment_intent_data: {
          application_fee_amount: 123,
          transfer_data: {
            destination: connectedAccountId,
            // destination: "cus_O6ccSm8NMgOCRg",
          },
        },
        success_url: "https://example.com/success",
        cancel_url: "https://example.com/cancel",
      });

      res.status(200).json({ sessionId: session.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
