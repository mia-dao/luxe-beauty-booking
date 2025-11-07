import React, { useState } from 'react';
import { Calendar, Clock, DollarSign, MessageCircle, X, Send, Sparkles, Check } from 'lucide-react';
import StripeCheckout from './components/StripeCheckout';

export default function App() {
  const [selectedService, setSelectedService] = useState(null);
  const [bookingStep, setBookingStep] = useState('services');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m here to help you book your beauty service. What can I help you with today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [bookingData, setBookingData] = useState({
    service: null,
    date: '',
    time: '',
    name: '',
    email: '',
    phone: ''
  });

  const services = [
    {
      id: 1,
      name: 'Luxury Facial',
      duration: '60 min',
      price: 8500,
      description: 'Deep cleansing, exfoliation, and hydrating treatment',
      image: '🧖‍♀️'
    },
    {
      id: 2,
      name: 'Hair Styling',
      duration: '90 min',
      price: 12000,
      description: 'Cut, wash, blow-dry, and styling',
      image: '💇‍♀️'
    },
    {
      id: 3,
      name: 'Manicure & Pedicure',
      duration: '75 min',
      price: 6500,
      description: 'Complete nail care with gel polish',
      image: '💅'
    },
    {
      id: 4,
      name: 'Massage Therapy',
      duration: '60 min',
      price: 9500,
      description: 'Relaxing full-body massage',
      image: '💆‍♀️'
    },
    {
      id: 5,
      name: 'Makeup Application',
      duration: '45 min',
      price: 7500,
      description: 'Professional makeup for any occasion',
      image: '💄'
    },
    {
      id: 6,
      name: 'Bridal Package',
      duration: '180 min',
      price: 35000,
      description: 'Complete bridal beauty experience',
      image: '👰'
    }
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setBookingData({ ...bookingData, service: service });
    setBookingStep('datetime');
  };

  const handleDateTimeConfirm = () => {
    if (bookingData.date && bookingData.time) {
      setBookingStep('payment');
    } else {
      alert('Please select both date and time');
    }
  };

  const handlePaymentSuccess = () => {
    setBookingStep('confirmation');
  };

  const handleChatSend = () => {
    if (!chatInput.trim()) return;

    const newMessages = [
      ...chatMessages,
      { role: 'user', content: chatInput }
    ];

    let aiResponse = '';
    const input = chatInput.toLowerCase();

    if (input.includes('price') || input.includes('cost')) {
      aiResponse = 'Our services range from $65 to $350. Would you like to see our full price list?';
    } else if (input.includes('book') || input.includes('appointment')) {
      aiResponse = 'I can help you book an appointment! Click on any service above to get started. What type of service interests you?';
    } else if (input.includes('cancel') || input.includes('reschedule')) {
      aiResponse = 'You can cancel or reschedule up to 24 hours before your appointment. Please provide your booking reference number.';
    } else if (input.includes('time') || input.includes('available')) {
      aiResponse = 'We\'re open Monday-Saturday, 9 AM to 6 PM. Would you like to check availability for a specific service?';
    } else if (input.includes('facial') || input.includes('massage') || input.includes('hair')) {
      aiResponse = 'Great choice! That\'s one of our most popular services. Would you like to book it now or learn more about what\'s included?';
    } else {
      aiResponse = 'I\'m here to help! You can ask me about our services, prices, availability, or booking process. What would you like to know?';
    }

    setChatMessages([...newMessages, { role: 'assistant', content: aiResponse }]);
    setChatInput('');
  };

  const formatPrice = (cents) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="text-purple-600" size={32} />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Luxe Beauty Studio
              </h1>
            </div>
            <button
              onClick={() => setBookingStep('services')}
              className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
            >
              Book Now
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {bookingStep === 'services' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
              <p className="text-gray-600 text-lg">Choose your perfect beauty experience</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
                  onClick={() => handleServiceSelect(service)}
                >
                  <div className="h-40 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-7xl">
                    {service.image}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{service.name}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-600">
                        <Clock size={16} className="mr-1" />
                        <span className="text-sm">{service.duration}</span>
                      </div>
                      <div className="flex items-center text-purple-600 font-bold text-lg">
                        <DollarSign size={20} />
                        <span>{formatPrice(service.price)}</span>
                      </div>
                    </div>
                    <button className="w-full mt-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {bookingStep === 'datetime' && selectedService && (
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => setBookingStep('services')}
              className="mb-6 text-purple-600 hover:text-purple-700 flex items-center"
            >
              ← Back to Services
            </button>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Select Date & Time</h2>
              
              <div className="mb-6 p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Selected Service:</h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg">{selectedService.name}</span>
                  <span className="text-purple-600 font-bold">{formatPrice(selectedService.price)}</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    <Calendar className="inline mr-2" size={20} />
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    <Clock className="inline mr-2" size={20} />
                    Select Time
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setBookingData({ ...bookingData, time })}
                        className={`py-3 rounded-lg font-semibold transition-all ${
                          bookingData.time === time
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleDateTimeConfirm}
                  className="w-full py-4 bg-purple-600 text-white rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          </div>
        )}

        {bookingStep === 'payment' && (
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => setBookingStep('datetime')}
              className="mb-6 text-purple-600 hover:text-purple-700 flex items-center"
            >
              ← Back
            </button>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Payment Details</h2>

              <div className="mb-6 p-4 bg-purple-50 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="font-semibold">Service:</span>
                  <span>{selectedService.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Date:</span>
                  <span>{bookingData.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Time:</span>
                  <span>{bookingData.time}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-purple-600 pt-2 border-t border-purple-200">
                  <span>Total:</span>
                  <span>{formatPrice(selectedService.price)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                  <input
                    type="text"
                    value={bookingData.name}
                    onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    value={bookingData.email}
                    onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                    placeholder="jane@example.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                  <input
                    type="tel"
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <StripeCheckout
                  amount={selectedService.price}
                  bookingData={bookingData}
                  onSuccess={handlePaymentSuccess}
                />
              </div>
            </div>
          </div>
        )}

        {bookingStep === 'confirmation' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="text-green-600" size={40} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Booking Confirmed!</h2>
              <p className="text-gray-600 mb-8">
                Thank you, {bookingData.name}! Your appointment has been confirmed.
              </p>

              <div className="bg-purple-50 rounded-lg p-6 mb-8 text-left">
                <h3 className="font-bold text-gray-800 mb-4">Appointment Details:</h3>
                <div className="space-y-2">
                  <p><span className="font-semibold">Service:</span> {selectedService.name}</p>
                  <p><span className="font-semibold">Date:</span> {bookingData.date}</p>
                  <p><span className="font-semibold">Time:</span> {bookingData.time}</p>
                  <p><span className="font-semibold">Duration:</span> {selectedService.duration}</p>
                  <p><span className="font-semibold">Email:</span> {bookingData.email}</p>
                </div>
              </div>

              <p className="text-gray-600 mb-6">
                A confirmation email has been sent to {bookingData.email}
              </p>

              <button
                onClick={() => {
                  setBookingStep('services');
                  setSelectedService(null);
                  setBookingData({
                    service: null,
                    date: '',
                    time: '',
                    name: '',
                    email: '',
                    phone: ''
                  });
                }}
                className="px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Book Another Service
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto mt-4 mb-4 text-center text-gray-500 text-sm">
            © 2025 Mia Dao. Built with React.
          </div>

      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageCircle size={24} />
              <div>
                <h3 className="font-bold">Beauty Assistant</h3>
                <p className="text-xs opacity-90">Online now</p>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} className="hover:bg-white/20 rounded-full p-1">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={handleChatSend}
                className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </div>

          
        </div>
      )}

      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-40"
      >
        {chatOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}