import { useState } from "react";

const ConnectStripeButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConnectStripe = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/stripe", { method: "POST" });
      const data = await response.json();

      console.log("Created Stripe account:", data);
    } catch (error) {
      console.error("Error creating Stripe account:", error);
    }

    setIsLoading(false);
  };

  return (
    <button
      className="b_button"
      onClick={handleConnectStripe}
      disabled={isLoading}
    >
      {isLoading ? "Connecting..." : "Connect with Stripe"}
    </button>
  );
};

export default ConnectStripeButton;
