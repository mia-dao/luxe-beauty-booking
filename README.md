# Luxe Beauty Studio - Booking Platform

Professional beauty services booking platform with Stripe payments and AI chatbot assistance.

## Features
- 🎨 Beautiful, responsive UI
- 💳 Secure Stripe payment integration
- 🤖 AI-powered chatbot assistant
- 📅 Real-time booking system
- ✉️ Email confirmations
- 📱 Mobile-friendly

## Let Mia Know 

If you’d like to integrate this solution for your enterprise or personal business, let Mia know how she can help.


## Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/mia-dao/luxe-beauty-booking.git
cd luxe-beauty-booking
```

### 2. Install dependencies
```bash
# Install frontend dependencies
npm install

# Install server dependencies
cd server
npm install
cd ..
```

### 3. Set up environment variables
Create `.env` file in root and `server/.env`:
```env
# Root .env
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key

# server/.env
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### 4. Run the application
```bash
npm run dev  # Runs both frontend and backend
```

Visit `http://localhost:3000`

## Stripe Setup
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Get your test API keys
3. Add to .env files
4. Use test card: `4242 4242 4242 4242`

## AI Chatbot Integration
Integrate OpenAI or Claude API for intelligent responses.

## Deployment
- Frontend: Vercel/Netlify
- Backend: Heroku/Railway
- Database: MongoDB/PostgreSQL

## License
MIT
