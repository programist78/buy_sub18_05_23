// pages/api/withdraw.js
// import stripePackage from 'stripe';

// const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: 1000, // Укажите сумму вывода в центах
          // currency: 'usd',
          // name: 'Вывод баланса',
          quantity: 1,
          price: "price_1NGiVoBD1PAMw3USqVMWCWQo",
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success', // Укажите URL страницы успеха
      cancel_url: 'http://localhost:3000/cancel', // Укажите URL страницы отмены
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Произошла ошибка при создании сессии Stripe.' });
  }
};

// pages/api/withdraw.js

// pages/api/withdraw.js
import stripePackage from 'stripe';

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);
//payment
// export default async (req, res) => {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       mode: 'payment',
//       line_items: [
//         {
//           price: 10,
//           quantity: 1,
//         },
//       ],
//       payment_intent_data: {
//         application_fee_amount: 123,
//         transfer_data: {
//           destination: 'acct_1NGj3sB0h13I84qB',
//         },
//       },
//       success_url: 'https://example.com/success',
//       cancel_url: 'https://example.com/cancel',
//     });

//     res.status(200).json({ sessionId: session.id });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Произошла ошибка при создании сессии Stripe.' });
//   }
// };

// export default async (req, res) => {
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: 1000,
//       currency: 'usd',
//       automatic_payment_methods: {
//         enabled: true,
//       },
//       transfer_data: {
//         destination: 'acct_1NGj3sB0h13I84qB',
//       },
//     });
    

//     res.status(200).json({ sessionId: paymentIntent.id });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Произошла ошибка при создании сессии Stripe.' });
//   }
// };
