import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Инициализация клиентского Stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function CheckoutPage() {
  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: "price_1NGiVoBD1PAMw3USqVMWCWQo",
          connectedAccountId: "acct_1NGj3sB0h13I84qB",
        }),
      });

      if (response.ok) {
        const { sessionId } = await response.json();

        // Перенаправление пользователя на страницу оформления заказа Stripe
        const stripe = await stripePromise;
        stripe.redirectToCheckout({ sessionId });
      } else {
        console.error("Request failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "250px" }}>
      <h1>Checkout</h1>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}
