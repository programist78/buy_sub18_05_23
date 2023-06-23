import stripePackage from "stripe";

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);


export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const account = await stripe.accounts.create({
        country: 'US',
        type: 'express',
        capabilities: {
          card_payments: {
            requested: true,
          },
          transfers: {
            requested: true,
          },
        },
        business_type: 'individual',
        business_profile: {
          url: 'https://webxwiz.com',
        },
      });

      const loginLink = await stripe.accounts.createLoginLink(account.id);
      window.location.href = loginLink.url;
      console.log(loginLink)
      res.status(200).json({ account });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};
