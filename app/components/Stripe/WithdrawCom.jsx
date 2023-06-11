// pages/withdraw.js
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const WithdrawCom = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleWithdraw = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/withdraw", {
        method: "POST",
      });
      console.log(response);

      if (!response.ok) {
        throw new Error("Не удалось обработать запрос на вывод.");
      }

      const { sessionId } = await response.json();
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      );
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Вывод баланса</h1>
      {error && <p>{error}</p>}
      <button onClick={handleWithdraw} disabled={loading}>
        {loading ? "Обработка..." : "Вывести"}
      </button>
    </div>
  );
};

export default WithdrawCom;
