const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Create payment intent
app.post('/api/create-payment-intent', async (req, res) => {
  const { amount, email, name } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      receipt_email: email,
      metadata: {
        customer_name: name
      }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
    alert("💜 I love to get paid! But this is only a demo! 💜");
  }
});

// Save booking
app.post('/api/bookings', async (req, res) => {
  const { service, date, time, name, email, phone } = req.body;
  
  // In production, save to database
  // For now, just return success
  res.json({ 
    success: true, 
    bookingId: `BK${Date.now()}`,
    message: 'Booking confirmed'
  });
});

// AI Chatbot endpoint (integrate with OpenAI or Anthropic)
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  
  // In production, integrate with OpenAI API or Claude API
  // For demo purposes, return simple responses
  let response = "I'm here to help! Ask me about our services.";
  
  res.json({ response });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));