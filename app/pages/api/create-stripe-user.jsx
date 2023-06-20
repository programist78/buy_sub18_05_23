import stripePackage from "stripe";

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req,
  res
) {
  if (req.method === 'POST') {
    try {
      const { id } = req.body;

      // Создание пользователя в Stripe
      const account = await stripe.accountLinks.create({
        account: id,
        type: 'account_onboarding',
      });
      console.log(account.id)
      // Дальнейшие действия, если необходимо

      res.status(200).json({ success: true, accountId: account.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
