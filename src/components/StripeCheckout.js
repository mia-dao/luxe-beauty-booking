// src/components/StripeCheckout.js
/* eslint-disable */
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function CheckoutForm({ amount, onSuccess, bookingData }) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [cardComplete, setCardComplete] = useState(false); // track card input

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    // Demo popup
    alert("💜 I love to get paid! But this is only a demo! 💜");
    onSuccess();

    setProcessing(false);
  };

  // check if all fields filled
  const isDisabled =
    !bookingData.name ||
    !bookingData.email ||
    !bookingData.phone ||
    !cardComplete ||
    processing;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border-2 border-gray-200 rounded-lg">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': { color: '#aab7c4' }
              }
            }
          }}
          onChange={(e) => setCardComplete(e.complete)}
        />
      </div>

      <button
        type="submit"
        disabled={isDisabled}
        className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold disabled:opacity-50"
      >
        {processing ? 'Processing...' : `Pay $${(amount / 100).toFixed(2)}`}
      </button>
    </form>
  );
}

export default function StripeCheckout(props) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm {...props} />
    </Elements>
  );
}
